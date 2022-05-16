using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
using PasteBook.WebApi.DataTransferObject;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

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

        [HttpGet("/timeline/{UserId}")]
        public async Task<IActionResult> GetPostsByUserId(int UserId, int friendId)
        {
            List<NewsFeedItem> userFeed = new List<NewsFeedItem>();
            var userPosts = await UnitOfWork.PostRepository.Find(p => p.UserId == UserId);
            var userPostsArranged = userPosts.OrderByDescending(p => p.PostDate).ToList();
            foreach (Post post in userPostsArranged)
            {
                var postComments = await UnitOfWork.CommentRepository.Find(c => c.PostId == post.PostId);
                var postLikes = await UnitOfWork.LikeRepository.Find(l => l.PostId == post.PostId);
                userFeed.Add(new NewsFeedItem
                {
                    Post = post,
                    CommentCount = postComments.Count(),
                    LikeCount = postLikes.Count()
                });
            }
            return Ok(userFeed);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await UnitOfWork.PostRepository.FindByPrimaryKey(id);
            var postComments = await UnitOfWork.CommentRepository.Find(c => c.PostId == id);
            var postLikes = await UnitOfWork.LikeRepository.Find(l => l.PostId == id);

            //Wrap Post metadata into PostDTO
            var postData = new PostDTO
            {
                Post = post,
                Comments = postComments.OrderByDescending(p => p.CommentId),
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
