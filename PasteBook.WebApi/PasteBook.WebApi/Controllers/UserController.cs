using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Helpers;
using PasteBook.WebApi.Models;
using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("users")]
    [ApiController]
    [AuthorizeAccess]
    public class UserController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        public UserController(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        //[AuthorizeAccess]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await UnitOfWork.UserRepository.FindAll();
            return Ok(users);
        }

        [HttpGet("username/{userName}")]
        public async Task<IActionResult> GetUserByUserName(string userName)
        {
            try
            {
                var user = await UnitOfWork.UserRepository.Find(u=>u.UserName.Equals(userName));
                if (user is object)
                {
                    return Ok(user);
                }
            }
            catch (Exception e)
            {

            }
            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await UnitOfWork.UserRepository.FindByPrimaryKey(id);
                if (user is object)
                {
                    return Ok(user);
                }
            }
            catch(Exception e)
            {
                
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var newUser = await UnitOfWork.UserRepository.Insert(user);
                await UnitOfWork.CommitAsync();

                return StatusCode(StatusCodes.Status201Created, newUser);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await UnitOfWork.UserRepository.FindByPrimaryKey(id);
            if (user is object)
            {
                UnitOfWork.UserRepository.Delete(user);
                await UnitOfWork.CommitAsync();
                return NoContent();
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }
            Random rnd = new Random();
            user.UserName = Regex.Replace(user.FirstName, @"\s", "") + Regex.Replace(user.LastName, @"\s", "") + user.UserId.ToString();
            UnitOfWork.UserRepository.Update(user);
            try
            {
                await UnitOfWork.CommitAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                var existingUser = await UnitOfWork.UserRepository.FindByPrimaryKey(id);
                if (existingUser is null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
    }
}
