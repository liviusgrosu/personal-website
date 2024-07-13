using Application.Blog;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogPostController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetBlogPosts()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [AllowAnonymous]
        [HttpGet("{blogId}")]
        public async Task<IActionResult> GetBlogPost(Guid blogId)
        {
            return HandleResult(await Mediator.Send(new Details.Query { BlogId = blogId }));
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost(BlogPost blogPost)
        {
            return HandleResult(await Mediator.Send(new Create.Command { BlogPost = blogPost }));
        }
        
        [HttpPut]
        public async Task<IActionResult> EditBlogPost(BlogPost blogPost)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { BlogPost = blogPost }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
