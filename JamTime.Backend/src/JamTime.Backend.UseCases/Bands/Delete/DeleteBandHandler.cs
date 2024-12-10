using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.UseCases.Bands.Delete;

public class DeleteBandHandler(IRepository<Band> repository) : ICommandHandler<DeleteBandCommand, Result>
{
  public async Task<Result> Handle(DeleteBandCommand req, CancellationToken ct)
  {
    var band = await repository.GetByIdAsync(req.BandId, ct);
    if (band == null)
    {
      return Result.NotFound();
    }

    await repository.DeleteAsync(band, ct);

    return Result.Success();
  }
}
