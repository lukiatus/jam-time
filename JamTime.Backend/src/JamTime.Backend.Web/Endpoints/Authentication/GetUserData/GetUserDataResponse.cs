using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.Web.Endpoints.Authentication.GetUserData;

public class GetUserDataResponse
{
  public Guid Id { get; set; }
  public string Email { get; set; } = default!;
  public string Name { get; set; } = default!;
  public IEnumerable<string> Roles { get; set; } = default!;
  public IEnumerable<BandDTO> Bands { get; set; } = default!;
  public IEnumerable<BandDTO> ManagedBands { get; set; } = default!;
}
