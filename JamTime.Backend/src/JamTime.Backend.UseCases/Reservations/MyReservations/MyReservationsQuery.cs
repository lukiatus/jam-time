using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Reservations.MyReservations;

public record MyReservationsQuery(Guid UserId, int Skip, int Take) : IQuery<Result<IEnumerable<ReservationDTO>>>;
