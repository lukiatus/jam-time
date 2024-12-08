using FastEndpoints;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Reservations.List;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Reservations.List;

public class ListReservationEndpoint(IMediator mediator) : EndpointWithoutRequest<List<ListReservationResponse>>
{
  public override void Configure()
  {
    Get("/reservations");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListReservationsQuery(0, 50), ct);

    if (result.IsSuccess)
    {
      Response = result.Value.Select(r => new ListReservationResponse
      {
        ReservationId = r.Id,
        Band = r.Band.Name,
        From = r.From,
        To = r.To,
        Remark = r.Remark ?? string.Empty
      }).ToList();
    }
  }
}
