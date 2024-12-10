using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.Enums;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Bands.GetById;

public class GetBandByIdEndpoint(AppDbContext dbContext) : Endpoint<GetBandByIdRequest, GetBandByIdResponse>
{
  public override void Configure()
  {
    Get("/bands/{bandId:int}");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(GetBandByIdRequest req, CancellationToken ct)
  {
    var band = await dbContext.Bands.FirstAsync(b => b.Id == req.BandId, ct);
    var musicians = dbContext.Musicians;
    var leader = await musicians.FirstAsync(m => m.Id == band.LeaderMusicianId, ct);
    var members = await dbContext.Set<MusicianBand>().Join(
        musicians,
        mb => mb.MusicianId,
        m => m.Id,
        (mb, m) => new {mb, m}
      )
      .Where(j => j.mb.BandId == req.BandId)
      .Select(j => new MusicianDTO(j.m.Id, j.m.Name))
      .ToListAsync(ct).ConfigureAwait(false);

    Response = new GetBandByIdResponse
    {
      Id = band.Id, Name = band.Name, Leader = new MusicianDTO(leader.Id, leader.Name), Members = members
    };
  }
}
