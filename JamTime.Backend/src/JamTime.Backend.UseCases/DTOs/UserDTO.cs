namespace JamTime.Backend.UseCases.DTOs;

public class UserDTO
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public string Email { get; init; } = default!;
  public IEnumerable<string> Roles { get; init; } = default!;
  public IEnumerable<int> Bands { get; init; } = default!;
}
