using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.Bands.Create;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Enums;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Bands.Create;

public class CreateBandEndpoint(IMediator mediator, AppDbContext dbContext)
  : Endpoint<CreateBandRequest, BandDetailsDTO>
{
  public override void Configure()
  {
    Post("/bands");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(CreateBandRequest req, CancellationToken ct)
  {
    var command = new CreateBandCommand(req.Name, req.LeaderMusicianId);
    var result = await mediator.Send(command, ct);

    req.Members.ToList().ForEach(m =>
      dbContext.MusicianBands.Add(new MusicianBand { BandId = result.Value.Id, MusicianId = m }));
    await dbContext.SaveChangesAsync(ct);

    if (result.IsSuccess)
    {
      Response = new BandDetailsDTO
      {
        Id = result.Value.Id, Name = result.Value.Name, LeaderName = result.Value.LeaderName
      };
    }
  }
}
