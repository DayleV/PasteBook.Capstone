using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("userfriends")]
    [ApiController]
    public class UserFriendController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        public UserFriendController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserFriends()
        {
            var userfriends = await UnitOfWork.UserFriendRepository.FindAll();
            return Ok(userfriends);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserFriendById(int id)
        {
            var friend = await UnitOfWork.UserFriendRepository.FindByPrimaryKey(id);
            if (friend is object)
            {
                return Ok(friend);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserFriend userFriend)
        {
            if (ModelState.IsValid)
            {
                var newUserFriend = await UnitOfWork.UserFriendRepository.Insert(userFriend);
                await UnitOfWork.CommitAsync();

                return StatusCode(StatusCodes.Status201Created, newUserFriend);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userFriend = await UnitOfWork.UserFriendRepository.FindByPrimaryKey(id);
            if (userFriend != null)
            {
                UnitOfWork.UserFriendRepository.Delete(userFriend);
                await UnitOfWork.CommitAsync();
                return Ok(userFriend);
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlbum(int id, [FromBody] UserFriend userFriend)
        {
            if (id != userFriend.UserFriendId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                UnitOfWork.UserFriendRepository.Update(userFriend);
                await UnitOfWork.CommitAsync();
                return Ok(userFriend);
            }
            return BadRequest();
        }
    }
}
