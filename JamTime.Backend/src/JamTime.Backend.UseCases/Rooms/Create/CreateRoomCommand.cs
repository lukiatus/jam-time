using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Rooms.Create;

public record CreateRoomCommand(string Name, string Place, int Capacity): ICommand<Result<int>>;
