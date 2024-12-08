using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Rooms.Create;

public class CreateRoomHandler(IRepository<Room> _repository) : ICommandHandler<CreateRoomCommand, Result<int>>
{
  public async Task<Result<int>> Handle(CreateRoomCommand req, CancellationToken ct)
  {
    var room = new Room(req.Name, req.Place, req.Capacity);
    var createdRoom = await _repository.AddAsync(room, ct);

    return createdRoom.Id;
  }
}
