using JamTime.Backend.Infrastructure.Data;
using JamTime.Backend.Infrastructure.Data.Entities;
using JamTime.Backend.Web.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace JamTime.Backend.Web.Services;

public class AppNotificationService(IHubContext<AppNotificationHub> hub, AppDbContext dbContext)
  : IAppNotificationService
{
  public async Task CreateNotificationAsync(Guid userId, string message, CancellationToken ct = default)
  {
    var notification = new AppNotification { RecipientId = userId, Message = message };

    await dbContext.AppNotifications.AddAsync(notification, ct);
    await dbContext.SaveChangesAsync(ct);
  }

  public async Task SendOwnNotificationListAsync(Guid userId, CancellationToken ct = default)
  {
    var notifications = await GetAllNotificationForUserAsync(userId, ct);
    await hub.Clients.User(userId.ToString()).SendAsync("NotificationListReceived", notifications, ct);
  }

  private async Task<IEnumerable<AppNotification>> GetAllNotificationForUserAsync(Guid userId,
    CancellationToken ct = default)
  {
    var notification = await dbContext.AppNotifications
      .AsNoTracking()
      .Where(n => n.RecipientId == userId && !n.ReadOn.HasValue)
      .OrderByDescending(n => n.CreatedAt)
      .ToListAsync(ct);

    return notification;
  }

  public async Task ArchiveNotificationAsync(Guid userId, int notificationId, CancellationToken ct = default)
  {
    var notification = dbContext.AppNotifications.First(n => n.RecipientId == userId && n.Id == notificationId);
    notification.ReadOn = DateTime.Now;
    dbContext.AppNotifications.Update(notification);

    await dbContext.SaveChangesAsync(ct);
  }

  public Task ArchiveAllNotificationAsync(Guid userId, CancellationToken ct = default)
  {
    var notificationsToUpdate = dbContext.AppNotifications
      .Where(n => n.RecipientId == userId && !n.ReadOn.HasValue)
      .ToList();

    notificationsToUpdate.ForEach(n =>
    {
      n.ReadOn = DateTime.Now;
    });
    dbContext.AppNotifications.UpdateRange(notificationsToUpdate);
    dbContext.SaveChanges();

    return Task.CompletedTask;
  }
}
