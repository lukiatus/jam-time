using Ardalis.Result;
using Ardalis.SharedKernel;

namespace JamTime.Backend.UseCases.Bands.Edit;

public record EditBandCommand(int BandId, string Name, int LeaderMusicianId, IEnumerable<int> members): ICommand<Result>;
