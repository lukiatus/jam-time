using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication()
    .AddJwtBearer(opt =>
    {
        //opt.
    });

builder.Services.AddAuthorization();
builder.Services.AddScoped<jam_time_backend.AuthenticationService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/get", () => """
                         {
                             "message": "Hello World!"
                         }
                         """);
    //.RequireAuthorization();

app.MapPost("/login", async ([FromHeader(Name = "GoogleIdToken")] string idToken) =>
{
    // if (!request.Headers.TryGetValue("GoogleIdToken", out var idToken))
    // {
    //     return Results.BadRequest("Token is missing.");
    // }

    var settings = new GoogleJsonWebSignature.ValidationSettings()
    {
        Audience = new List<string> { app.Configuration["Authentication:Google:ClientId"] }
    };
    var a = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
    return Results.Ok();
});

app.Run();