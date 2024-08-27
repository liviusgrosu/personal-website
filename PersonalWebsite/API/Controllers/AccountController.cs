using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<IdentityUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(IdentityUser user)
        {
            return new UserDto
            {
                Token = _tokenService.CreateToken(user),
            };
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<UserDto>> ChangeCredentials(ChangeLoginDto newLoginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync();

            if (user == null)
                return NotFound("User not found.");

            user.Email = newLoginDto.Email;

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
                return BadRequest("Failed to update user.");

            if (!string.IsNullOrEmpty(newLoginDto.CurrentPassword) && !string.IsNullOrEmpty(newLoginDto.NewPassword))
            {
                var passwordChangeResult = await _userManager.ChangePasswordAsync(user, newLoginDto.CurrentPassword, newLoginDto.NewPassword);

                if (!passwordChangeResult.Succeeded)
                    return BadRequest("Failed to update password.");
            }

            return CreateUserObject(user);
        }
    }
}
