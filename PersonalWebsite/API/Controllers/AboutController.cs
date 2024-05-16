using Application.About;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AboutController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            return HandleResult(await Mediator.Send(new Details.Query { }));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> EditAbout(AboutDto content)
        {
            return HandleResult(await Mediator.Send(new Details.Query { }));
        }
    }
}
