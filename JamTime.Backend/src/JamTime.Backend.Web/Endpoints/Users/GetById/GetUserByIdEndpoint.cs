using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.Enums;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Users.GetById;

public class GetUserByIdEndpoint(AppDbContext dbContext) : Endpoint<GetUserByIdRequest, GetUserByIdResponse>
{
  public override void Configure()
  {
    Get("/users/{userId:Guid}");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(GetUserByIdRequest req, CancellationToken ct)
  {
    var user = await dbContext.Users
      .OrderBy(u => u.Musician.Name)
      .Where(u => u.Id == req.UserId)
      .Select(u => new
      {
        Id = u.Id,
        Name = u.Musician.Name,
        Email = u.Email ?? string.Empty,
        Bands =
          string.Join(", ",
            dbContext.MusicianBands.Where(ub => ub.MusicianId == u.MusicianId).Select(mb => mb.Band.Name)),
        Roles = u.UserRoles,
        ManagedBands = string.Join(", ",
          dbContext.Bands.Where(b => b.LeaderMusicianId == u.MusicianId).Select(b => b.Name))
      }).FirstOrDefaultAsync(ct);

    if (user is null)
    {
      await SendNotFoundAsync(ct);
      return;
    }

    Response = new GetUserByIdResponse
    {
      Id = user.Id,
      Name = user.Name,
      Email = user.Email,
      Bands = user.Bands,
      Roles = user.Roles.Select(ur => RoleEnum.FromValue(ur.Role).Value).ToList(),
      ManagedBands = user.ManagedBands,
    };
  }
}
