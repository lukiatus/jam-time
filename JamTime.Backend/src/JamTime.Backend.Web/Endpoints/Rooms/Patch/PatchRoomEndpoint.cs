using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Rooms.SetActiveState;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Rooms.Patch;

public class PatchRoomEndpoint(IMediator mediator) : Endpoint<PatchRoomRequest, Result>
{
  public override void Configure()
  {
    Patch("/rooms/{Id:int}");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(PatchRoomRequest req, CancellationToken ct)
  {
    var command = new SetRoomActiveStateCommand(req.Id, req.IsActive);
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
