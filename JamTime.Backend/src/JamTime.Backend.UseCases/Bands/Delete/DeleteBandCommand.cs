using Ardalis.Result;
using Ardalis.SharedKernel;

namespace JamTime.Backend.UseCases.Bands.Delete;

public record DeleteBandCommand(int BandId): ICommand<Result>;
