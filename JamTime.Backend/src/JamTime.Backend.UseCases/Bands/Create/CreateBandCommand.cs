using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Bands.Create;

public record CreateBandCommand(string Name, int LeaderMusicianId) : ICommand<Result<BandDetailsDTO>>;
