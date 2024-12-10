using Ardalis.Result;
using Ardalis.SharedKernel;

namespace JamTime.Backend.UseCases.Rooms.SetActiveState;

public record SetRoomActiveStateCommand(int Id, bool IsActive) : ICommand<Result>;
