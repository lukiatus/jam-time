using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.UseCases.Rooms.Edit;

public class EditRoomHandler(IRepository<Room> repository) : ICommandHandler<EditRoomCommand, Result>
{
  public async Task<Result> Handle(EditRoomCommand req, CancellationToken ct)
  {
    var roomToEdit = await repository.GetByIdAsync(req.Id, ct);
    if (roomToEdit is null)
    {
      return Result.NotFound();
    }

    roomToEdit.Update(req.Name, req.Place, req.Capacity);

    await repository.UpdateAsync(roomToEdit, ct);

    return Result.Success();
  }
}
