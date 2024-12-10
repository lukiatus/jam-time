using Ardalis.Result;
using Ardalis.SharedKernel;

namespace JamTime.Backend.UseCases.Reservations.Reject;

public record RejectReservationCommand(int ReservationId, string Reason): ICommand<Result>;
