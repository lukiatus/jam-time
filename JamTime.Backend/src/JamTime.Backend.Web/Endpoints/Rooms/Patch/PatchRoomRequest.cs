namespace JamTime.Backend.Web.Endpoints.Rooms.Patch;

public class PatchRoomRequest
{
  public int Id { get; init; }
  public bool IsActive { get; init; }
}
