using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
using PasteBook.WebApi.DataTransferObject;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> GetPostById(int id)
        {
            var posts = await UnitOfWork.PostRepository.Find(p => p.PostId == id);
            var postComments = await UnitOfWork.CommentRepository.Find(c => c.PostId == id);
            var postLikes = await UnitOfWork.LikeRepository.Find(l => l.PostId == id);

            //Wrap Post metadata into PostDTO
            var postData = new PostDTO
            {
                Post = posts.ToList(),
                Comments = postComments.ToList(),
                Likes = postLikes.ToList()
            };
            if (postData is object)
            {
                return Ok(postData);
            };
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
