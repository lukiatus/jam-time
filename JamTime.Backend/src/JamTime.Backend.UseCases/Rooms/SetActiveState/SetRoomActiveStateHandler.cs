using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.UseCases.Rooms.SetActiveState;

public class SetRoomActiveStateHandler(IRepository<Room> repository)
  : ICommandHandler<SetRoomActiveStateCommand, Result>
{
  public async Task<Result> Handle(SetRoomActiveStateCommand req, CancellationToken ct)
  {
    var roomToEdit = await repository.GetByIdAsync(req.Id, ct);
    if (roomToEdit == null)
    {
      return Result.NotFound();
    }

    if (req.IsActive == false)
    {
      roomToEdit.Deactivate();
    }
    else
    {
      roomToEdit.Activate();
    }

    await repository.UpdateAsync(roomToEdit, ct);

    return Result.Success();
  }
}
