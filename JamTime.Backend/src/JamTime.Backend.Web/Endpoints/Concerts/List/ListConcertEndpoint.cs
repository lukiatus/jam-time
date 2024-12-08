using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Concerts.List;

public class ListConcertEndpoint(AppDbContext dbContext) : EndpointWithoutRequest<List<ListConcertResponse>>
{
  public override void Configure()
  {
    Get("/concerts");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var concerts = await dbContext.Concerts
      .Include(c => c.SupportBands)
      .Select(i => new ListConcertResponse
      {
        Id = i.Id,
        Description = i.Description,
        FlyerUrl = i.FlyerUrl,
        Place = i.Place,
        HeadlinerBand = i.HeadlinerBand,
        GateOpeningTime = i.GateOpeningTime,
        SupportBands = i.SupportBands.Select(sb => sb.BandName)
      })
      .ToListAsync(ct);
    
    Response = concerts;
  }
}
