using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        public PostController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var users = await UnitOfWork.PostRepository.FindAll();
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostsById(int id)
        {
            var posts = await UnitOfWork.PostRepository.FindByPrimaryKey(id);
            if (posts is object)
            {
                return Ok(posts);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Post post)
        {
            if (ModelState.IsValid)
            {
                var newPost = await UnitOfWork.PostRepository.Insert(post);
                await UnitOfWork.CommitAsync();

                return StatusCode(StatusCodes.Status201Created, newPost);
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] Post post)
        {
            if (id != post.PostId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                UnitOfWork.PostRepository.Update(post);
                await UnitOfWork.CommitAsync();

                return Ok(post);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await UnitOfWork.PostRepository.FindByPrimaryKey(id);

            if (post == null)
            {
                return BadRequest();
            }

            await UnitOfWork.PostRepository.Delete(id);
            await UnitOfWork.CommitAsync();

            return Ok(post);
        }
    }
}
