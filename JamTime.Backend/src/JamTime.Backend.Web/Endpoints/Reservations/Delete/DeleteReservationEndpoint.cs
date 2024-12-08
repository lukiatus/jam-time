using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Reservations.Delete;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Reservations.Delete;

public class DeleteReservationEndpoint(IMediator mediator) : Endpoint<DeleteReservationRequest, Result>
{
  public override void Configure()
  {
    Delete("/reservations/{ReservationId:int}");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(DeleteReservationRequest req, CancellationToken ct)
  {
    var command = new DeleteReservationCommand(req.ReservationId, req.Reason);
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
