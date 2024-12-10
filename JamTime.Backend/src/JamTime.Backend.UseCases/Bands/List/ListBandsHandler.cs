using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Bands.List;

public class ListBandsHandler(IBandQueryService queryService) : IQueryHandler<ListBandsQuery, Result<IEnumerable<BandDetailsDTO>>>
{
  public async Task<Result<IEnumerable<BandDetailsDTO>>> Handle(ListBandsQuery req, CancellationToken ct)
  {
    var bands = await queryService.ListAsync(req.Skip, req.Take, ct);

    return bands.ToList();
  }
}
