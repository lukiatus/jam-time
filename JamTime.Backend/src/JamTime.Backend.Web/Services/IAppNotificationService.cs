namespace JamTime.Backend.Web.Services;

public interface IAppNotificationService
{
  Task CreateNotificationAsync(Guid userId, string message, CancellationToken ct = default);
  Task SendOwnNotificationListAsync(Guid userId, CancellationToken ct = default);
  Task ArchiveNotificationAsync(Guid userId, int notificationId, CancellationToken ct = default);
  Task ArchiveAllNotificationAsync(Guid userId, CancellationToken ct = default);
}
