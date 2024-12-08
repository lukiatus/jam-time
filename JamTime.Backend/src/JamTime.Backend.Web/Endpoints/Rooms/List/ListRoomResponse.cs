namespace JamTime.Backend.Web.Endpoints.Rooms.List;

public class ListRoomResponse
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public string Place { get; init; } = default!;
  public int Capacity { get; init; }
}
