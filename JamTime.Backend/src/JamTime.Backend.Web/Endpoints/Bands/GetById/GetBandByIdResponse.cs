using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.Web.Endpoints.Bands.GetById;

public class GetBandByIdResponse
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public MusicianDTO Leader { get; init; } = default!;
  public IEnumerable<MusicianDTO> Members { get; set; } = default!;
}

public class MusicianDTO(int id, string name)
{
  public int Id { get; set; } = id;
  public string Name { get; set; } = name;
}
