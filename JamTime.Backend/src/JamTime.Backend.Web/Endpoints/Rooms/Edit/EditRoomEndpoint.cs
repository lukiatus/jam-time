using Ardalis.Result;
using FastEndpoints;
using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.UseCases.DTOs;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Rooms.Edit;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Endpoints.Rooms.Edit;

public class EditRoomEndpoint(IMediator mediator, AppDbContext dbContext) : Endpoint<EditRoomRequest, EditRoomResponse>
{
  public override void Configure()
  {
    Put("/rooms/{Id:int}");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(EditRoomRequest req, CancellationToken ct)
  {
    var command = new EditRoomCommand(req.Id, req.Name, req.Place, req.Capacity);
    var result = await mediator.Send(command, ct);

    if (result.Status == ResultStatus.NotFound)
    {
      await SendNotFoundAsync(ct);
      return;
    }

    var room = await dbContext.Rooms.FirstAsync(r => r.Id == req.Id, ct);

    Response = new EditRoomResponse { Id = room.Id, Name = room.Name, Place = room.Place, Capacity = room.Capacity };
  }
}
