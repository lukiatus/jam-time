namespace JamTime.Backend.Web.Endpoints.Rooms.GetById;

public class GetRoomByIdResponse
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public string Place { get; init; } = default!;
  public int Capacity { get; init; }
}
