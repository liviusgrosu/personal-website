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
            }

            if (!context.BlogPosts.Any())
            {
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
            }

            if (!context.Projects.Any())
            {
                var testProjects = new List<Project>
                {
                    new Project
                    {
                        Title = "Test project 1",
                        Description = "Description 1",
                        Content = "<p>stupid</p>",
                        Category = "webdev",
                        Image = "https://res.cloudinary.com/dobxnbfvx/image/upload/v1714269552/ysbtccbjtlu2i2biptoj.png",
                        Tags = new List<string> { "C#", "C++" }
                    },
                    new Project
                    {
                        Title = "Test project 2",
                        Description = "Description 2",
                        Content = "<p>gdfgdfg</p>",
                        Category = "gamedev",
                        Image = "https://res.cloudinary.com/dobxnbfvx/image/upload/v1714269348/qdr5bkh8ctzad7bn8mbu.png"
                        Tags = new List<string> { "Python", "Jinja", ".NET" }
                    },
                    new Project
                    {
                        Title = "Test project 2",
                        Description = "Description 3",
                        Content = "<p>other</p>",
                        Category = "other",
                        Image = "https://res.cloudinary.com/dobxnbfvx/image/upload/v1714094769/o1rc4u7zftpfz0qv1aok.jpg"
                        Tags = new List<string> { }
                    }
                };
                await context.Projects.AddRangeAsync(testProjects);
            }
            await context.SaveChangesAsync();
        }
    }
}
