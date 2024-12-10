using JamTime.Backend.Core.Enums;

namespace JamTime.Backend.Web.Endpoints.Reservations.Search;

public class SearchReservationRequest
{
  public DateTime? From { get; set; }
  public DateTime? To { get; set; }
  public ReservationStatus? Status { get; set; }
  public string? SearchText { get; set; }
}
