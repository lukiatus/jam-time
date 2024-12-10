namespace JamTime.Backend.Web.Endpoints.Users.Edit;

public class EditUserRequest
{
  public Guid UserId { get; set; }
  public string Name { get; set; } = default!;
  public string? Email { get; set; } = default!;
  public IEnumerable<string> Roles { get; set; } = default!;
}
