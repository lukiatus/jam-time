using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.Enums;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Settings.Edit;

public class EditSettingsEndpoint(AppDbContext dbContext) : Endpoint<EditSettingsRequest, Result>
{
  public override void Configure()
  {
    Put("/settings");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(EditSettingsRequest req, CancellationToken ct)
  {
    var setting = await dbContext.Settings.FirstAsync(s => s.Key == "SystemMessage", ct);
    setting.Value = req.SystemMessage;
    await dbContext.SaveChangesAsync(ct);
  }
}
