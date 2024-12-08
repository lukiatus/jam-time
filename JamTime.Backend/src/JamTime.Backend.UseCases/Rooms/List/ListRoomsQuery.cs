using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Rooms.List;

public record ListRoomsQuery(int Skip, int Take) : IQuery<Result<IEnumerable<RoomDTO>>>;
