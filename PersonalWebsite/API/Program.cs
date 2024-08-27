using API.Extensions;
using API.Middleware;
using API.Services;
using AspNetCoreRateLimit;


//using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMemoryCache();

// Add services to the container.
builder.Services.AddControllers(opt =>
{
    // Every endpoint is going to require authentication
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services
        .AddApplicationServices(builder.Configuration)
        .AddIdentityServices(builder.Configuration)
        .AddInMemoryRateLimiting()
        .AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>()
        .AddScoped<EmailService>();

builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimitOptions"));

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseIpRateLimiting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Using is used so that it gets picked up by the garbage collector later
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    // Get the data context service and execute any pending migrations
    // As in update the database
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
