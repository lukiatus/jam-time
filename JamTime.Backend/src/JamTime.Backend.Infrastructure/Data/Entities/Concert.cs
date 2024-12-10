using System.ComponentModel.DataAnnotations;

namespace JamTime.Backend.Infrastructure.Data.Entities;

public class Concert
{
  public int Id { get; init; }
  [MaxLength(100)]
  public string Place { get; init; } = default!;
  public DateTime GateOpeningTime { get; init; }
  [MaxLength(2000)]
  public string Description { get; init; } = default!;
  [MaxLength(100)]
  public string HeadlinerBand { get; init; } = default!;
  [MaxLength(500)]
  public string? FlyerUrl { get; init; }
  public IEnumerable<ConcertSupportBand> SupportBands { get; init; } = default!;
  
}
