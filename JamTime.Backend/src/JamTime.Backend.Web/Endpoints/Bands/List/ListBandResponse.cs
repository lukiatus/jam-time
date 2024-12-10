namespace JamTime.Backend.Web.Endpoints.Bands.List;

public class ListBandResponse
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public string LeaderName { get; init; } = default!;
}
