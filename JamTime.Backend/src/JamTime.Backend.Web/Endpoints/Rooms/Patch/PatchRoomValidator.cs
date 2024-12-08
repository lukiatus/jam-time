using FastEndpoints;
using FluentValidation;

namespace JamTime.Backend.Web.Endpoints.Rooms.Patch;

public class PatchRoomValidator : Validator<PatchRoomRequest>
{
  public PatchRoomValidator()
  {
    RuleFor(x => x.Id)
      .NotNull();

    RuleFor(x => x.IsActive)
      .NotNull();
  }
}
