using Application.About;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class AboutController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            return HandleResult(await Mediator.Send(new Details.Query { }));
        }

        [HttpPost]
        public async Task<IActionResult> EditAbout(string content)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Content = content}));
        }
    }
}
