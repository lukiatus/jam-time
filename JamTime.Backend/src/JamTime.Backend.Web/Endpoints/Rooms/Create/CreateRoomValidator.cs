using FastEndpoints;
using FluentValidation;

namespace JamTime.Backend.Web.Endpoints.Rooms.Create;

public class CreateRoomValidator : Validator<CreateRoomRequest>
{
  public CreateRoomValidator()
  {
    RuleFor(x => x.Name)
      .NotEmpty()
      .MaximumLength(200);

    RuleFor(x => x.Capacity)
      .NotEmpty()
      .LessThan(100);

    RuleFor(x => x.Place)
      .NotEmpty()
      .MaximumLength(200);
  }
}
