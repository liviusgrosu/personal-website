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
            if (!userManager.Users.Any() &&
                !context.BlogPosts.Any())
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

                var testBlogPosts = new List<BlogPost>
                {
                    new BlogPost
                    {
                        Title = "Test blog 1",
                        Content = "<p>stupid</p>",
                        Date = DateTime.UtcNow.AddMonths(-1),
                    },
                    new BlogPost
                    {
                        Title = "Test blog 2",
                        Content = "<p>gdfgdfg</p>",
                        Date = DateTime.UtcNow.AddMonths(-2),
                    },
                    new BlogPost
                    {
                        Title = "Test blog 2",
                        Content = "<p>asdasdas</p>",
                        Date = DateTime.UtcNow.AddMonths(-3),
                    }
                };

                await context.BlogPosts.AddRangeAsync(testBlogPosts);
                await context.SaveChangesAsync();
            }
        }
    }
}
