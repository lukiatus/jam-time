using Ardalis.SharedKernel;
using FastEndpoints;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.UseCases.Enums;
using JamTime.Backend.UseCases.Rooms.Create;
using MediatR;

namespace JamTime.Backend.Web.Endpoints.Rooms.Create;

public class CreateRoomEndpoint(IMediator mediator, IReadRepository<Room> roomRepository)
  : Endpoint<CreateRoomRequest, CreateRoomResponse>
{
  public override void Configure()
  {
    Post("/rooms");
    Roles(RoleEnum.Admin);
  }

  public override async Task HandleAsync(CreateRoomRequest req, CancellationToken ct)
  {
    var command = new CreateRoomCommand(req.Name, req.Place, req.Capacity);
    var roomId = await mediator.Send(command, ct);

    var createdRoom = await roomRepository.GetByIdAsync(roomId.Value, ct);

    Response = new CreateRoomResponse
    {
      Id = createdRoom!.Id, Name = createdRoom.Name, Capacity = createdRoom.Capacity, Place = createdRoom.Place
    };
  }
}
