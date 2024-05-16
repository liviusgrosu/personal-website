using Application.Blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogController : BaseApiController
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
        /*
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost(BlogPost blogPost)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, BlogPost blogPost)
        {
            blogPost.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }*/
    }
}
