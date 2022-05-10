using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Helpers;
using PasteBook.WebApi.Services;
using PasteBook.WebApi.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace PasteBook.WebApi.Controllers
{
    [Route("authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IUserService userService;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AuthenticationController(IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            this.userService = userService;
            this.httpContextAccessor = httpContextAccessor;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = this.userService.Authenticate(model);

            if (response == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            return Ok(response);
        }

        [AuthorizeAccess]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = this.userService.GetAll();
            var userId = this.httpContextAccessor.HttpContext.Items["User"];
            return Ok(users);
        }
    }
}
