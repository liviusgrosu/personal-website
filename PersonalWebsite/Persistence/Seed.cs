using Domain;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<IdentityUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                await userManager.CreateAsync(new IdentityUser
                {
                    UserName = "liviusg",
                    Email = "liviusgrosu@gmail.com"
                }, "Pa$$w0rd");

                await context.AboutEntry.AddAsync(
                    new About
                    {
                        Content = "<p>Test</p>"
                    }
                );

                await context.SaveChangesAsync();
            }
        }
    }
}
