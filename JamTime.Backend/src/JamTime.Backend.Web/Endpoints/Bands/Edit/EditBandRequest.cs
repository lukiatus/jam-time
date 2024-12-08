namespace JamTime.Backend.Web.Endpoints.Bands.Edit;

public class EditBandRequest
{
  public int BandId { get; set; }
  public string Name { get; init; } = default!;
  public int LeaderMusicianId { get; init; }
  public IEnumerable<int> Members { get; init; } = default!;
}
