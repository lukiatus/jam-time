using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Rooms.Edit;

public record EditRoomCommand(int Id, string Name, string Place, int Capacity) : ICommand<Result>;
