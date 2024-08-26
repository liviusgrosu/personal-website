using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactController : BaseApiController
    {
        private readonly EmailService _emailService;

        public ContactController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SendContactEmail([FromBody] ContactRequest request)
        {
            await _emailService.SendEmailAsync(
                request.FromEmail,
                request.Subject,
                request.Message 
            );

            return Ok("Email sent successfully");
        }

        public class ContactRequest
        {
            public string FromEmail { get; set; }
            public string Subject { get; set; }
            public string Message { get; set; }
        }
    }
}
