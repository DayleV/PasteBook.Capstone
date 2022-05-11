using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Helpers;
using PasteBook.WebApi.Services;
using PasteBook.WebApi.DataObjectTransfer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using PasteBook.WebApi.Data;
using System.Threading.Tasks;
using System.Linq;

namespace PasteBook.WebApi.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IUserService userService;
        private readonly IHttpContextAccessor httpContextAccessor;
        public IUnitOfWork UnitOfWork { get; private set; }
        public AuthenticationController(IUserService userService, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork)
        {
            this.userService = userService;
            this.httpContextAccessor = httpContextAccessor;
            this.UnitOfWork = unitOfWork;
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] UserRegistration user)
        {
            var existingEmail = await this.UnitOfWork.AuthenticationRepository.Find(e => e.EmailAddress.Equals(user.EmailAddress));
            if (existingEmail.Count() > 0)
                return BadRequest(new { message = "Email Already Exist" });
            if (ModelState.IsValid)
            {
                var Auth = await UnitOfWork.AuthenticationRepository.EncryptAuthentication(user);
                return StatusCode(StatusCodes.Status201Created, new { message = "Account Successfuly Created"});
            }
            return BadRequest(new { message = "Something Went Wrong" });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var user = await this.UnitOfWork.AuthenticationRepository.Authenticate(model);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            var response = this.userService.GenerateResponse(user);

            return Ok(response);
        }

        [AuthorizeAccess]
        [HttpGet("/some")]
        public async Task<IActionResult> GetAll()
        {
            var users = await UnitOfWork.UserRepository.FindAll();
            return Ok(users);
        }
    }
}
