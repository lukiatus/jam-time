using Ardalis.SharedKernel;

namespace JamTime.Backend.Core.Events;

internal sealed class ReservationCreatedEvent(int reservationId) : DomainEventBase
{
  public int ReservationId { get; } = reservationId;
}
