using Ardalis.Result;
using Ardalis.SharedKernel;

namespace JamTime.Backend.UseCases.Contributors.Get;

public record GetContributorQuery(int ContributorId) : IQuery<Result<ContributorDTO>>;
