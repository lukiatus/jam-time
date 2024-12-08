namespace JamTime.Backend.UseCases.DTOs;

public class MusicianWithBandsDTO
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public IEnumerable<BandDTO> Bands { get; init; } =default!;
}
