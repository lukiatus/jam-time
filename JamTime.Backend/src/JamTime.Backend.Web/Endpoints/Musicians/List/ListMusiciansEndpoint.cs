using FastEndpoints;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.Enums;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Musicians.List;

public class ListMusiciansEndpoint(AppDbContext dbContext) : EndpointWithoutRequest<IEnumerable<ListMusiciansResponse>>
{
  public override void Configure()
  {
    Get("/musicians");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var musicians = await dbContext.Set<Musician>()
      .Join(dbContext.Users,
        m => m.Id,
        u => u.MusicianId,
        (musician, user) => new { musician, user }
      )
      .Select(g => new ListMusiciansResponse
      {
        Id = g.musician.Id, Name = g.musician.Name, Email = g.user.Email ?? string.Empty
      })
      .ToListAsync(ct);

    Response = musicians;
  }
}
