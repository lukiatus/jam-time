using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.UseCases.Reservations.Reject;

public class RejectReservationHandler(IRepository<Reservation> reservationRepository)
  : ICommandHandler<RejectReservationCommand, Result>
{
  public async Task<Result> Handle(RejectReservationCommand req, CancellationToken ct)
  {
    var reservation = await reservationRepository.GetByIdAsync(req.ReservationId, ct);
    if (reservation is null)
    {
      return Result.NotFound();
    }
    
    reservation.Reject(req.Reason);
    await reservationRepository.UpdateAsync(reservation, ct);

    return Result.Success();
  }
}
