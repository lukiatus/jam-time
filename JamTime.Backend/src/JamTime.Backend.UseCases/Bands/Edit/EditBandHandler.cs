using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.Core.Entities;

namespace JamTime.Backend.UseCases.Bands.Edit;

public class EditBandHandler(IRepository<Band> repository) : ICommandHandler<EditBandCommand, Result>
{
  public async Task<Result> Handle(EditBandCommand req, CancellationToken ct)
  {
    var bandToEdit = await repository.GetByIdAsync(req.BandId, ct);
    if (bandToEdit == null)
    {
      return Result.NotFound();
    }

    bandToEdit.UpdateName(req.Name);
    bandToEdit.UpdateLeader(req.LeaderMusicianId);

    await repository.UpdateAsync(bandToEdit, ct);

    return Result.Success();
  }
}
