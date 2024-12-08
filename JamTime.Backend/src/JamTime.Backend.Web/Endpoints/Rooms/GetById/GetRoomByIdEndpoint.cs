using Ardalis.SharedKernel;
using FastEndpoints;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.UseCases.Enums;

namespace JamTime.Backend.Web.Endpoints.Rooms.GetById;

public class GetRoomByIdEndpoint(IReadRepository<Room> roomRepository)
  : Endpoint<GetRoomByIdRequest, GetRoomByIdResponse>
{
  public override void Configure()
  {
    Get("/rooms/{roomId:int}");
    Roles(RoleEnum.Admin, RoleEnum.BandLeader, RoleEnum.User);
  }

  public override async Task HandleAsync(GetRoomByIdRequest req, CancellationToken ct)
  {
    var room = await roomRepository.GetByIdAsync(req.RoomId, ct);
    Response = new GetRoomByIdResponse { Id = room!.Id, Name = room.Name, Capacity = room.Capacity, Place = room.Place };
  }
}
