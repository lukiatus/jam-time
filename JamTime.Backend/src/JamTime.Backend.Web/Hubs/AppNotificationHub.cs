using JamTime.Backend.Web.Services;

namespace JamTime.Backend.Web.Hubs;

public class AppNotificationHub(IAppNotificationService notificationService): BaseHub
{
  public async Task GetNotifications()
  {
    await notificationService.SendOwnNotificationListAsync(UserId);
  }

  public async Task ArchiveAllNotification()
  {
    await notificationService.ArchiveAllNotificationAsync(UserId);
  }

  public async Task ArchiveNotification(int notificationId)
  {
    await notificationService.ArchiveNotificationAsync(UserId, notificationId);
  }
}
