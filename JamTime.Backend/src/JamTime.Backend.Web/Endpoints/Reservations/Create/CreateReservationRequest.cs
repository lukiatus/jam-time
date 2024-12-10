using System.ComponentModel.DataAnnotations;

namespace JamTime.Backend.Web.Endpoints.Reservations.Create;

public class CreateReservationRequest
{
  [MaxLength(40)]
  public string Remark { get; init; } = default!;
  public DateTime From { get; init; }
  public DateTime To { get; init; }
  public int BandId { get; init; }
  public int RoomId { get; init; }
}
