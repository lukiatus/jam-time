namespace JamTime.Backend.Web.Endpoints.Reservations.Reject;

public class RejectReservationRequest
{
  public required int ReservationId { get; set; }
  public required string Reason { get; set; }
}
