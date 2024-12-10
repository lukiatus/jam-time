using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Settings.Get;

public class GetSettingsEndpoint(AppDbContext dbContext) : EndpointWithoutRequest<GetSettingsResponse>
{
  public override void Configure()
  {
    Get("/settings");
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var systemMessage = await dbContext.Settings.FirstAsync(s => s.Key == "SystemMessage", ct);
    Response = new GetSettingsResponse { SystemMessage = systemMessage.Value };
  }
}
