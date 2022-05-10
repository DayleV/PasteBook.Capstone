﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Models;
using System.Linq;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        public UserController(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await UnitOfWork.UserRepository.FindAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await UnitOfWork.UserRepository.FindByPrimaryKey(id);
            if (user is object)
            {
                return Ok(user);
            }
            return NotFound();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistration user)
        {
            var existingUser = await UnitOfWork.UserRepository.Find(u => u.EmailAddress.Equals(user.EmailAddress));
            if (existingUser.Count() > 0)
            {
                return BadRequest();
            }
            var newUser = await UnitOfWork.UserRepository.Register(user);
            await UnitOfWork.CommitAsync();
            await UnitOfWork.AuthenticationRepository.HashPassword(newUser.UserId, user.Password);
            return StatusCode(StatusCodes.Status201Created, newUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
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
        public async Task<IActionResult> Put(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }
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
