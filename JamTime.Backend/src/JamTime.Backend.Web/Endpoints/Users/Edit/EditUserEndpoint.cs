using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.Enums;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Users.Edit;

public class EditUserEndpoint(AppDbContext dbContext) : Endpoint<EditUserRequest, Result>
{
  public override void Configure()
  {
    Put("/users/{userId:Guid}");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(EditUserRequest req, CancellationToken ct)
  {
    var user = await dbContext.Users.Include(u => u.Musician).FirstAsync(u => u.Id == req.UserId, ct);
    user.Musician.Name = req.Name;
    user.Email = req.Email;
    dbContext.Users.Update(user);
    await dbContext.SaveChangesAsync(ct);

    var newRoles = req.Roles.Select(r => new UserRole { UserId = user.Id, Role = RoleEnum.FromValue(r) });
    var oldRoles = dbContext.UserRoles.Where(ur => ur.UserId == req.UserId);
    dbContext.UserRoles.RemoveRange(oldRoles);
    dbContext.UserRoles.AddRange(newRoles);
    await dbContext.SaveChangesAsync(ct);

    await SendNoContentAsync(ct);
  }
}
