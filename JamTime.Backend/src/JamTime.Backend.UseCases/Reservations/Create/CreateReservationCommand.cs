using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Reservations.Create;

public record CreateReservationCommand(int BandId, DateTime From, DateTime To, int RoomId, string Remark)
  : ICommand<Result<int>>;
