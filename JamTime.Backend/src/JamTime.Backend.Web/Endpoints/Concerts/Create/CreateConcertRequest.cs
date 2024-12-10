namespace JamTime.Backend.Web.Endpoints.Concerts.Create;

public class CreateConcertRequest
{
  public string Place { get; init; } = default!;
  public DateTime GateOpeningTime { get; init; }
  public string Description { get; init; } = default!;
  public string HeadlinerBand { get; init; } = default!;
  public string? FlyerUrl { get; init; }
  public IEnumerable<string> SupportBands { get; init; } = default!;
}
