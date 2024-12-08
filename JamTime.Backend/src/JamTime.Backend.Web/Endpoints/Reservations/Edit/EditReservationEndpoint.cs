using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Reservations.Edit;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Reservations.Edit;

public class EditReservationEndpoint(IMediator mediator): Endpoint<EditReservationRequest, Result>
{
  public override void Configure()
  {
    Put("/reservations/{Id:int}");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(EditReservationRequest req, CancellationToken ct)
  {
    var command = new EditReservationCommand(req.Id, req.BandId, req.From, req.To, req.RoomId, req.Remark);
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
