using Ardalis.GuardClauses;
using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Enums;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Authentication.GetUserData;

public class GetUserDataEndpoint(AppDbContext dbContext) : Endpoint<GetUserDataRequest, GetUserDataResponse>
{
  public override void Configure()
  {
    Get("/authentication/users/{UserId:Guid}");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(GetUserDataRequest req, CancellationToken ct)
  {
    //TODO: valahová kiszervezni ezt
    var userMusician = await dbContext.Users
      .Include(u => u.UserRoles)
      .Join(dbContext.Musicians,
        u => u.MusicianId,
        m => m.Id,
        (u, m) => new { User = u, Musician = m }
      )
      .FirstOrDefaultAsync(u => u.User.Id == req.UserId, ct);

    Guard.Against.Null(userMusician, nameof(userMusician));

    var bands = await dbContext.Set<MusicianBand>()
      .Where(mb => mb.MusicianId == userMusician.User.MusicianId)
      .Join(dbContext.Bands,
        mb => mb.BandId,
        b => b.Id,
        (mb, b) => new { Musician = mb, Band = b }
      )
      .Select(mb => new BandDTO { Id = mb.Band.Id, Name = mb.Band.Name })
      .ToListAsync(ct);

    var musicians = dbContext.Musicians;
    var managedBands = dbContext.Bands
      .Where(b => b.LeaderMusicianId == userMusician.Musician.Id)
      .Join(musicians,
        band => band.LeaderMusicianId,
        musician => musician.Id,
        (band, musician) => new { band, musician }
      )
      .Select(bm => new BandDTO { Id = bm.band.Id, Name = bm.band.Name })
      .ToList();
    var userRoles = userMusician.User.UserRoles.Select(ur => RoleEnum.FromValue(ur.Role).Value).ToList();
    var result = new GetUserDataResponse
    {
      Id = userMusician.User.Id,
      Email = userMusician.User.Email ?? string.Empty,
      Name = userMusician.Musician.Name,
      Roles = userRoles,
      Bands = bands,
      ManagedBands = managedBands
    };

    Response = result;
  }
}
