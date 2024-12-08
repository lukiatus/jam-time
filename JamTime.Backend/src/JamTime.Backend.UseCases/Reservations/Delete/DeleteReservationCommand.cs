using Ardalis.Result;
using Ardalis.SharedKernel;

namespace JamTime.Backend.UseCases.Reservations.Delete;

public record DeleteReservationCommand(int ReservationId, string Reason) : ICommand<Result>;
