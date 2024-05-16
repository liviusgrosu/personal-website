using Application.About;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class AboutController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            return HandleResult(await Mediator.Send(new Details.Query { }));
        }

/*        [Authorize]
        [HttpPost]
        public async Task<IActionResult> EditAbout(Activity activity)
        {
            return new NotImplementedException();
        }*/
    }
}
