namespace JamTime.Backend.Web.Endpoints.Reservations.Create;

public class CreateReservationResponse
{
  public int Id { get; set; }
  public string BandName { get; set; } = default!;
  public string Remark { get; set; } = default!;
}
