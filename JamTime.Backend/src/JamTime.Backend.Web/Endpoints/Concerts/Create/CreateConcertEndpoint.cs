using System.Security.Claims;
using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.Web.Services;

namespace JamTime.Backend.Web.Endpoints.Concerts.Create;

public class CreateConcertEndpoint(AppDbContext dbContext, IAppNotificationService notificationService)
  : Endpoint<CreateConcertRequest, CreateConcertResponse>
{
  public override void Configure()
  {
    Post("/concerts");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader);
  }

  public override async Task HandleAsync(CreateConcertRequest req, CancellationToken ct)
  {
    var userId = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
    
    var concertToAdd = new Concert()
    {
      GateOpeningTime = req.GateOpeningTime,
      Place = req.Place,
      HeadlinerBand = req.HeadlinerBand,
      SupportBands = req.SupportBands.Select(i => new ConcertSupportBand { ConcertId = 0, BandName = i }).ToList(),
      Description = req.Description,
      FlyerUrl = req.FlyerUrl,
    };
    var newConcert = dbContext.Concerts.Add(concertToAdd);
    await dbContext.SaveChangesAsync(ct);
    var createdConcert = newConcert.Entity;

    var notificationMessage =
      $"Új koncertet hoztak létre: {concertToAdd.GateOpeningTime} - {concertToAdd.HeadlinerBand}";
    await notificationService.CreateNotificationAsync(userId, notificationMessage, ct);

    Response = new CreateConcertResponse
    {
      Id = createdConcert.Id,
      GateOpeningTime = createdConcert.GateOpeningTime,
      Place = createdConcert.Place,
      HeadlinerBand = createdConcert.HeadlinerBand,
      SupportBands = createdConcert.SupportBands?.Select(i => i.BandName),
      Description = createdConcert.Description,
      FlyerUrl = createdConcert.FlyerUrl,
    };
  }
}
