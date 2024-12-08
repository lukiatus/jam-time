using JamTime.Backend.Infrastructure.Data.Entities;

namespace JamTime.Backend.Web.Endpoints.Users.List;

public class ListUsersResponse
{
  public Guid Id { get; set; }
  public string Name { get; set; } = default!;
  public string Email { get; set; } = string.Empty;
  public string Bands { get; set; } = default!;
  public string Roles { get; set; } = default!;
  public string ManagedBands { get; set; } = default!;
}
