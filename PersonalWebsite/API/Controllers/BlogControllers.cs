using Domain;
using Application.Blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace API.Controllers
{
    public class BlogControllers : BaseApiController
    {
        [HttpGet("filter/{predicate}")]
        public async Task<IActionResult> GetBlogPosts(string category)
        {
            return HandleResult(await Mediator.Send(new List.Query { Category = category }));
        }

/*        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogPost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

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
