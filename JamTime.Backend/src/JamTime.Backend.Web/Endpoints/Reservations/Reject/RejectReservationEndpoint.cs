using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Reservations.Reject;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Reservations.Reject;

public class RejectReservationEndpoint(IMediator mediator) : Endpoint<RejectReservationRequest, Result>
{
  public override void Configure()
  {
    Delete("/reservations/reject/{ReservationId:int}");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(RejectReservationRequest req, CancellationToken ct)
  {
    var command = new RejectReservationCommand(req.ReservationId, req.Reason);
    var result = await mediator.Send(command, ct);
    
    if (result.Status == ResultStatus.NotFound)
    {
      await SendNotFoundAsync(ct);
      return;
    }

    if (result.IsSuccess)
    {
      await SendNoContentAsync(ct);
    }
  }
}
