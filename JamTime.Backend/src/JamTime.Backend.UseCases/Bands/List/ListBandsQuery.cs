using Ardalis.Result;
using Ardalis.SharedKernel;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.UseCases.Bands.List;

public record ListBandsQuery(int Skip, int Take) : IQuery<Result<IEnumerable<BandDetailsDTO>>>;
