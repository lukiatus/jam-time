using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.UseCases.Reservations.Delete;

public class DeleteReservationHandler(IRepository<Reservation> repository) : ICommandHandler<DeleteReservationCommand, Result>
{
  public async Task<Result> Handle(DeleteReservationCommand req, CancellationToken ct)
  {
    var reservation = await repository.GetByIdAsync(req.ReservationId, ct);
    if (reservation == null)
    {
      return Result.NotFound();
    }
    
    reservation.Cancel(req.Reason);
    await repository.UpdateAsync(reservation, ct);

    return Result.Success();
  }
}
