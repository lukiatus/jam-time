using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.Enums;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Users.List;

public class ListUsersEndpoint(AppDbContext dbContext) : EndpointWithoutRequest<IEnumerable<ListUsersResponse>>
{
  public override void Configure()
  {
    Get("/users");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var users = await dbContext.Users
      .OrderBy(u => u.Musician.Name)
      .Select(u => new ListUsersResponse
      {
        Id = u.Id,
        Name = u.Musician.Name,
        Email = u.Email ?? string.Empty,
        Bands =
          string.Join(", ",
            dbContext.MusicianBands.Where(ub => ub.MusicianId == u.MusicianId).Select(mb => mb.Band.Name)),
        Roles = string.Join(", ", u.UserRoles.Select(ur => ur.Role)),
        ManagedBands = string.Join(", ",
          dbContext.Bands.Where(b => b.LeaderMusicianId == u.MusicianId).Select(b => b.Name))
      })
      .ToListAsync(ct);

    Response = users;
  }
}
