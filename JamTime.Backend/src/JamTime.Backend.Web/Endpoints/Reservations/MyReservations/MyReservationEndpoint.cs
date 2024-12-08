using System.Globalization;
using System.Security.Claims;
using FastEndpoints;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Reservations.MyReservations;
using JamTime.Backend.Web.Extensions;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Reservations.MyReservations;

public class MyReservationEndpoint(IMediator mediator)
  : EndpointWithoutRequest<IEnumerable<MyReservationsResponse>>
{
  public override void Configure()
  {
    Get("/reservations/my-reservations");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var userId = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
    var result = await mediator.Send(new MyReservationsQuery(userId, 0, 50), ct);

    if (result.IsSuccess)
    {
      Response = result.Value.Select(r => new MyReservationsResponse
      {
        Id = r.Id,
        BandName = r.Band.Name,
        From = r.From.ToString("g", CultureInfo.CurrentCulture),
        To = r.To.ToString("g", CultureInfo.CurrentCulture),
        RoomName = r.Room.Name,
        Remark = r.Remark ?? string.Empty,
        StatusName = r.Status.ToLocalizedString()
      }).ToList();
    }
  }
}
