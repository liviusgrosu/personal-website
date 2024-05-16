using Application.Projects;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetProjects([FromQuery] ProjectsFilter param)
        {
            return HandleResult(await Mediator.Send(new List.Query { Param = param }));
        }

        [AllowAnonymous]
        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetProject(Guid projectId)
        {
            return HandleResult(await Mediator.Send(new Details.Query { ProjectId = projectId }));
        }

        /*
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost(BlogPost blogPost)
        {
            return HandleResult(await Mediator.Send(new Create.Command { BlogPost = blogPost }));
        }

        [HttpPut]
        public async Task<IActionResult> EditActivity(BlogPost blogPost)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { BlogPost = blogPost }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }*/
    }
}
