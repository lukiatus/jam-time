using JamTime.Backend.UseCases.Enums;

namespace JamTime.Backend.Web.Endpoints.Users.GetById;

public class GetUserByIdResponse
{
  public Guid Id { get; set; }
  public string Name { get; set; } = default!;
  public string Email { get; set; } = default!;
  public string Bands { get; set; } = default!;
  public IEnumerable<string> Roles { get; set; } = default!;
  public string ManagedBands { get; set; } = default!;
}
