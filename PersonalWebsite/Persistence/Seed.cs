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
                        Image = "image.png",
                        Content = "<p>stupid</p>"
                    },
                    new BlogPost
                    {
                        Title = "Test blog 2",
                        Image = "image.png",
                        Content = "<p>gdfgdfg</p>"
                    },
                    new BlogPost
                    {
                        Title = "Test blog 2",
                        Image = "image.png",
                        Content = "<p>asdasdas</p>"
                    }
                };

                await context.BlogPosts.AddRangeAsync(testBlogPosts);
                await context.SaveChangesAsync();
            }
        }
    }
}
