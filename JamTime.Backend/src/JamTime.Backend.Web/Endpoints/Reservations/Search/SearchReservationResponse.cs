namespace JamTime.Backend.Web.Endpoints.Reservations.Search;

public class SearchReservationResponse
{
  public int Id { get; init; }
  public string BandName { get; init; } = default!;
  public string From { get; init; } = default!;
  public string To { get; init; } = default!;
  public string RoomName { get; init; } = default!;
  public string Remark { get; init; } = default!;
  public string StatusName { get; init; } = default!;
}
