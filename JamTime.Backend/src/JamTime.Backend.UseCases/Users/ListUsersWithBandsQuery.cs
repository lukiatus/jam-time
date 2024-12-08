using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Users;

public record ListUsersWithBandsQuery(int Skip, int Take) : IQuery<Result<IEnumerable<MusicianWithBandsDTO>>>;
