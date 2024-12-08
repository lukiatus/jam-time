using FastEndpoints;
using FluentValidation;
using JamTime.Backend.UseCases.DTOs;

namespace JamTime.Backend.Web.Endpoints.Rooms.Edit;

public class EditRoomValidator: Validator<RoomDTO>
{
  public EditRoomValidator()
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
