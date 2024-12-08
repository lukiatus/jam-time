using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Bands.List;

public interface IBandQueryService
{
  Task<IEnumerable<BandDetailsDTO>> ListAsync(int skip, int take, CancellationToken ct);
}
