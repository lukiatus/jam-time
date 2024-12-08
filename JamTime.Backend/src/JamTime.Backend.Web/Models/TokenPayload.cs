namespace JamTime.Backend.Web.Models;

public record TokenPayload(string ExternalId, string? Email, string? Name);
