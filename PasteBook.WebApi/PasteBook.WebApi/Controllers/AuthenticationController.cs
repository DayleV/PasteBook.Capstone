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
using System.Text.RegularExpressions;

namespace PasteBook.WebApi.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IAuthenticationService authenticationService;
        private readonly IMailService mailService;
        public IUnitOfWork UnitOfWork { get; private set; }
        public AuthenticationController(IUserService userService, 
            IAuthenticationService authenticationService, 
            IUnitOfWork unitOfWork,
            IMailService mailService)
        {
            this.userService = userService;
            this.authenticationService = authenticationService;
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
                var newAuth = await UnitOfWork.AuthenticationRepository.InsertEncryptedUser(user, encryptPassword);
                newAuth.User.UserName = newAuth.User.FirstName + newAuth.User.LastName + (newAuth.User.UserId).ToString();
                this.UnitOfWork.AuthenticationRepository.Update(newAuth);
                await UnitOfWork.CommitAsync();
                return StatusCode(StatusCodes.Status201Created, new { message = "Account Successfuly Created" });

                //COMMENT ABOVE AND RUN TO CREATE DUMMY DATA OF AUTH AND USER
                /*string[] acc = { "John Doe", "Carol", "jack Adrian", "Bernadette", "Donna" };
                foreach (var item in acc)
                {
                    var u = new UserRegistration
                    {
                        EmailAddress = Regex.Replace(item.ToLower(), @"\s", "") + "@gmail.com",
                        Password = "a",
                        FirstName = item,
                        LastName = item
                    };
                    var encryptPassword = authenticationService.Encrypt(u.Password);
                    await UnitOfWork.AuthenticationRepository.InsertEncryptedUser(u, encryptPassword);
                }
                return Ok();*/
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
        [AuthorizeAccess]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest model)
        {
            //To Get AuthId of UserId
            User userAuthId = await UnitOfWork.UserRepository.FindByPrimaryKey(model.UserId);
            var auth = await UnitOfWork.AuthenticationRepository.FindByPrimaryKey(userAuthId.AuthenticationId);

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
