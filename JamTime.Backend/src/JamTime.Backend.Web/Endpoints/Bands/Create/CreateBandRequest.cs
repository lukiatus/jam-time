namespace JamTime.Backend.Web.Endpoints.Bands.Create;

public class CreateBandRequest
{
  public string Name { get; init; } = default!;
  public int LeaderMusicianId { get; init; }
  public IEnumerable<int> Members { get; init; } = default!;
}
