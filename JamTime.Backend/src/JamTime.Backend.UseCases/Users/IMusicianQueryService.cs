using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Users;

public interface IMusicianQueryService
{
  Task<IEnumerable<MusicianWithBandsDTO>> ListWithBandsAsync(int skip, int take, CancellationToken ct);
}
