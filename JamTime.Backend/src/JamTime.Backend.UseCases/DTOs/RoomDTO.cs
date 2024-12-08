namespace JamTime.Backend.UseCases.DTOs;

public class RoomDTO
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public string Place { get; init; } = default!;
  public int Capacity { get; init; }
}
