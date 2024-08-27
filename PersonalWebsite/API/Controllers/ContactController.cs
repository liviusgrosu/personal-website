using API.Services;
using Application.Contact;
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
        public async Task<IActionResult> SendContactEmail([FromBody] ContactRequestDto request)
        {
            await _emailService.SendEmailAsync(
                request.Name,
                request.Email,
                request.Body
            );

            return Ok("Email sent successfully");
        }
    }
}