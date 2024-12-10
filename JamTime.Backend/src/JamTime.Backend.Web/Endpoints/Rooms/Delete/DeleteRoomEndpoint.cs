using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Rooms.Delete;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Rooms.Delete;

public class DeleteRoomEndpoint(IMediator mediator): Endpoint<DeleteRoomRequest, Result>
{
  public override void Configure()
  {
    Delete("/rooms/{RoomId:int}");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(DeleteRoomRequest req, CancellationToken ct)
  {
    var command = new DeleteRoomCommand(req.RoomId);
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
