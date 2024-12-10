using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;
using JamTime.Backend.Core.Specifications;

namespace JamTime.Backend.UseCases.Reservations.Edit;

public class EditReservationHandler(IRepository<Reservation> repository)
  : ICommandHandler<EditReservationCommand, Result>
{
  public async Task<Result> Handle(EditReservationCommand req, CancellationToken ct)
  {
    var activeReservationSpec = new ActiveReservationByIdSpec(req.Id);

    var reservationToEdit = await repository.FirstOrDefaultAsync(activeReservationSpec, ct);

    if (reservationToEdit == null)
    {
      return Result.NotFound();
    }

    reservationToEdit.SetRemark(req.Remark ?? string.Empty);
    reservationToEdit.ModifyDetails(req.BandId, req.From, req.To, req.RoomId);
    await repository.UpdateAsync(reservationToEdit, ct);

    return Result.Success();
  }
}
