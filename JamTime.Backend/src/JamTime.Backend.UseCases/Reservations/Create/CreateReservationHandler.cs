using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.UseCases.Reservations.Create;

public class CreateReservationHandler(
  IRepository<Reservation> reservationRepository) : ICommandHandler<CreateReservationCommand, Result<int>>
{
  public async Task<Result<int>> Handle(CreateReservationCommand req, CancellationToken ct)
  {
    var reservationToCreate = new Reservation(req.BandId, req.From, req.To, req.RoomId);
    if (!string.IsNullOrEmpty(req.Remark))
    {
      reservationToCreate.SetRemark(req.Remark);
    }

    var newReservation = await reservationRepository.AddAsync(reservationToCreate, ct);
    return newReservation.Id;
  }
}
