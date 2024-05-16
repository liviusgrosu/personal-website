using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
