using Ardalis.SharedKernel;

namespace JamTime.Backend.Core.Events;

internal sealed class ReservationCancelledEvent(int reservationId) : DomainEventBase
{
  public int ReservationId { get; init; } = reservationId;
}
