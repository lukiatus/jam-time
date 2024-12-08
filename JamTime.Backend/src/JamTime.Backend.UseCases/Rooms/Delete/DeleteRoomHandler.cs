using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.UseCases.Rooms.Delete;

public class DeleteRoomHandler(IRepository<Room> repository) : ICommandHandler<DeleteRoomCommand, Result>
{
  public async Task<Result> Handle(DeleteRoomCommand req, CancellationToken ct)
  {
    var room = await repository.GetByIdAsync(req.RoomId, ct);
    if (room == null)
    {
      return Result.NotFound();
    }
    
    await repository.DeleteAsync(room, ct);

    return Result.Success();
  }
}
