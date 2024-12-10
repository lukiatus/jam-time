using JamTime.Backend.Core.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace JamTime.Backend.Core.Events;

internal class UserCreatedHandler(
  ILogger<UserCreatedHandler> logger,
  IEmailSender emailSender) : INotificationHandler<UserCreatedEvent>
{
  public async Task Handle(UserCreatedEvent domainEvent, CancellationToken cancellationToken)
  {
    logger.LogWarning("Handling User Created event for {userId}", domainEvent.UserId);
    
    await emailSender.SendEmailAsync("to@test.com",
      "from@test.com",
      "User created",
      $"Users with id {domainEvent.UserId} was created.");
  }
}
