using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Helpers;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("likes")]
    [ApiController]
    [AuthorizeAccess]
    public class LikeController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }

        public LikeController(IUnitOfWork UnitOfWork)
        {
            this.UnitOfWork = UnitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetLikes()
        {
            var likes = await UnitOfWork.LikeRepository.FindAll();
            return Ok(likes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLikesById(int id)
        {
            var likes = await UnitOfWork.LikeRepository.FindByPrimaryKey(id);
            if (likes is object)
            {
                return Ok(likes);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Like like)
        {
            if (ModelState.IsValid)
            {
                var newLike = await UnitOfWork.LikeRepository.Insert(like);
                await UnitOfWork.CommitAsync();
                return StatusCode(StatusCodes.Status201Created, newLike);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var like = await UnitOfWork.LikeRepository.FindByPrimaryKey(id);
            if (like != null)
            {
                UnitOfWork.LikeRepository.Delete(like);
                await UnitOfWork.CommitAsync();
                return Ok(like);
            }
            return NotFound();
        }

        [HttpPut("id")]
        public async Task<IActionResult> UpdateLike(int id, [FromBody] Like like)
        {
            if (id != like.LikeId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                UnitOfWork.LikeRepository.Update(like);
                await UnitOfWork.CommitAsync();
                return Ok(like);
            }
            return BadRequest();
        }
    }
}
