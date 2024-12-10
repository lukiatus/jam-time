using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Reservations.Edit;

public record EditReservationCommand(int Id, int BandId, DateTime From, DateTime To, int RoomId, string Remark) : ICommand<Result>;
