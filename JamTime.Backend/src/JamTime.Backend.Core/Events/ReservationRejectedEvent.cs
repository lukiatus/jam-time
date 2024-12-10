using Ardalis.SharedKernel;

namespace JamTime.Backend.Core.Events;

public sealed class ReservationRejectedEvent(int reservationId, string reason) : DomainEventBase
{
  public int ReservationId { get; set; } = reservationId;
  public string Reason { get; set; } = reason;
}
