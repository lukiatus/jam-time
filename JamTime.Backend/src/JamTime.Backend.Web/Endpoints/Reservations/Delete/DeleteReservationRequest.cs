namespace JamTime.Backend.Web.Endpoints.Reservations.Delete;

public class DeleteReservationRequest
{
  public int ReservationId { get; init; }
  public string Reason { get; init; } = default!;
}
