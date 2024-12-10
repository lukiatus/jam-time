using Microsoft.AspNetCore.SignalR;

namespace JamTime.Backend.Web.Hubs;

public class BaseHub : Hub
{
  protected Guid UserId => Guid.TryParse(Context.UserIdentifier, out Guid userId) ? userId : Guid.Empty;
}
