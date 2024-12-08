using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Reservations.List;

public record ListReservationsQuery(int Skip, int Take) : IQuery<Result<IEnumerable<ReservationDTO>>>;
