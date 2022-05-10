using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
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
            UnitOfWork = unitOfWork;
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
            var employee = await UnitOfWork.UserRepository.FindByPrimaryKey(id);
            if (employee is object)
            {
                return Ok(employee);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            var newUser = await UnitOfWork.UserRepository.Insert(user);
            await UnitOfWork.CommitAsync();
            return StatusCode(StatusCodes.Status201Created, newUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await UnitOfWork.UserRepository.FindByPrimaryKey(id);
            if (employee is object)
            {
                UnitOfWork.UserRepository.Delete(employee);
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
                var employee = await UnitOfWork.UserRepository.FindByPrimaryKey(id);
                if (employee is null)
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
