namespace JamTime.Backend.Web.Endpoints.Reservations.List;

public class ListReservationResponse
{
  public required int ReservationId { get; init; }
  public required DateTime From { get; init; }
  public required DateTime To { get; init; }
  public string Band { get; init; } = default!;
  public string Remark { get; init; } = default!;
}
