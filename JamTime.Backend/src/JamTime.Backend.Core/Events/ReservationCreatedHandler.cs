using JamTime.Backend.Core.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace JamTime.Backend.Core.Events;

internal class ReservationCreatedHandler(
  ILogger<ReservationCreatedHandler> logger,
  IEmailSender emailSender) : INotificationHandler<ReservationCreatedEvent>
{
  public async Task Handle(ReservationCreatedEvent domainEvent, CancellationToken cancellationToken)
  {
    logger.LogWarning("Handling Reservation Created event for {reservationId}", domainEvent.ReservationId);
    
    await emailSender.SendEmailAsync("to@test.com",
      "from@test.com",
      "Reservation created",
      $"Reservation with id {domainEvent.ReservationId} was created.");
  }
}
