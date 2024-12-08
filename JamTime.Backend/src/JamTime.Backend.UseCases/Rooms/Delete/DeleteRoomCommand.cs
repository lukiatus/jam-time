using Ardalis.Result;
using Ardalis.SharedKernel;

namespace JamTime.Backend.UseCases.Rooms.Delete;

public record DeleteRoomCommand(int RoomId) : ICommand<Result>;
