using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Users;

public class ListUsersWithBandsHandler(IMusicianQueryService queryService) : IQueryHandler<ListUsersWithBandsQuery, Result<IEnumerable<MusicianWithBandsDTO>>>
{
  public async Task<Result<IEnumerable<MusicianWithBandsDTO>>> Handle(ListUsersWithBandsQuery req, CancellationToken ct)
  {
    var users = await queryService.ListWithBandsAsync(req.Skip, req.Take, ct);
    
    return Result.Success(users);
  }
}
