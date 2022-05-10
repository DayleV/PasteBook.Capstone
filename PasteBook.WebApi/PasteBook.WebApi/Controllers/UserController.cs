using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetProducts()
        {
            var users = await UnitOfWork.UserRepository.FindAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
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
            if (ModelState.IsValid)
            {
                var newUser = await UnitOfWork.UserRepository.Insert(user);
                await UnitOfWork.CommitAsync();

                return StatusCode(StatusCodes.Status201Created, newUser);
            }

            return BadRequest();
        }
    }
}
