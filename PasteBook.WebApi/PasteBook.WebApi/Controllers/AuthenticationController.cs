using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Helpers;
using PasteBook.WebApi.Services;
using PasteBook.WebApi.DataObjectTransfer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using PasteBook.WebApi.Data;
using System.Threading.Tasks;
using System.Linq;
using PasteBook.WebApi.DataTransferObject;
using PasteBook.WebApi.Models;
using System;

namespace PasteBook.WebApi.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IAuthenticationService authenticationService;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IMailService mailService;
        public IUnitOfWork UnitOfWork { get; private set; }
        public AuthenticationController(IUserService userService, 
            IAuthenticationService authenticationService, 
            IHttpContextAccessor httpContextAccessor, 
            IUnitOfWork unitOfWork,
            IMailService mailService)
        {
            this.userService = userService;
            this.authenticationService = authenticationService;
            this.httpContextAccessor = httpContextAccessor;
            this.UnitOfWork = unitOfWork;
            this.mailService = mailService;
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] UserRegistration user)
        {
            try
            {
                var auth = await UnitOfWork.AuthenticationRepository.EmailExist(user.EmailAddress);
                if (auth != null)
                {
                    return BadRequest(new { message = "Email Already Exist" });

                }
                await mailService.SendEmailAsync(user);
                var encryptPassword = authenticationService.Encrypt(user.Password);
                await UnitOfWork.AuthenticationRepository.InsertEncryptedUser(user, encryptPassword);
                return StatusCode(StatusCodes.Status201Created, new { message = "Account Successfuly Created" });

                //COMMENT ABOVE AND RUN TO CREATE DUMMY DATA OF AUTH AND USER
                //string[] acc = {"john", "doe", "jack", "bruce", "wayne"};
                //foreach(var item in acc)
                //{
                //    var u = new UserRegistration
                //    {
                //        EmailAddress = item,
                //        Password = item,
                //        FirstName = item,
                //        LastName = item
                //    };
                //    var encryptPassword = authenticationService.Encrypt(u.Password);
                //    await UnitOfWork.AuthenticationRepository.InsertEncryptedUser(u, encryptPassword);
                //}
                //return Ok();
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var auth = await UnitOfWork.AuthenticationRepository.EmailExist(model.EmailAddress);

            if (auth == null)
                return Unauthorized(new { message = "Email Does Not Exist" });

            var isAuthenticated = authenticationService.Authenticate(auth, model.Password);

            if(!isAuthenticated)
                return Unauthorized(new { message = "Password is incorrect" });

            var user = await UnitOfWork.UserRepository.Find(u => u.AuthenticationId.Equals(auth.AuthenticationId));
            var response = this.userService.GenerateResponse(user.FirstOrDefault());
            return Ok(response);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest model)
        {
            var auth = await UnitOfWork.AuthenticationRepository.FindByPrimaryKey(model.AuthId);

            if (auth == null)
                return Unauthorized(new { message = "Invalid Authentication" });

            var isAuthenticated = authenticationService.Authenticate(auth, model.OldPassword);

            if (!isAuthenticated)
                return Unauthorized(new { message = "Password is incorrect" });

            if(model.EmailAddress != null)
            {
                var existingEmail = await UnitOfWork.AuthenticationRepository.EmailExist(model.EmailAddress);
                if (existingEmail != null)
                    return BadRequest(new { message = "Email Already Exist" });

                auth.EmailAddress = model.EmailAddress;
            }

            if (model.NewPassword != null)
            {
                var encryptPassword = authenticationService.Encrypt(model.NewPassword);

                auth.Password = encryptPassword.Password;
                auth.PasswordKey = encryptPassword.PasswordKey;
            }

            UnitOfWork.AuthenticationRepository.Update(auth);
            await UnitOfWork.CommitAsync();

            return Ok(new { message = "Account Successfuly Updated" });
        }


        //sample authorize route
        [AuthorizeAccess]
        [HttpGet("/some")]
        public async Task<IActionResult> GetAll()
        {
            var users = await UnitOfWork.UserRepository.FindAll();
            return Ok(users);
        }

    }
}
