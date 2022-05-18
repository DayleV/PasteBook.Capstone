﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
using PasteBook.WebApi.DataTransferObject;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using PasteBook.WebApi.Helpers;
using System;

namespace PasteBook.WebApi.Controllers
{
    [Route("posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        private readonly IHttpContextAccessor httpContextAccessor;

        public PostController(IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor)
        {
            UnitOfWork = unitOfWork;
            this.httpContextAccessor = httpContextAccessor;
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

        [HttpGet("/profile-album/{UserId}")]
        public async Task<IActionResult> GetAlbumsByUserId(int UserId, int friendId)
        {
            List<AlbumItem> userFeed = new List<AlbumItem>();
            var userAlbums = await UnitOfWork.AlbumRepository.Find(p => p.UserId == UserId);
            var userAlbumsArranged = userAlbums.OrderBy(p => p.AlbumName).ToList();
            foreach (Album album in userAlbumsArranged)
            {
                userFeed.Add(new AlbumItem
                {
                    Album = album,
                });
            }

            return Ok(userFeed);
        }

        [AuthorizeAccess]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            try
            {
                var currentLoggedInUser = this.httpContextAccessor.HttpContext.Items["UserId"];
                var post = await UnitOfWork.PostRepository.FindByPrimaryKey(id);
                var validAccess = await this.UnitOfWork.UserFriendRepository.Find(
                    user => user.UserId.Equals(currentLoggedInUser) || 
                    (user.UserId.Equals(post.UserId) && user.FriendId.Equals(currentLoggedInUser)));
                if (validAccess.Count() == 0)
                    return Unauthorized();
                var postComments = await UnitOfWork.CommentRepository.Find(c => c.PostId == id);
                var postLikes = await UnitOfWork.LikeRepository.Find(l => l.PostId == id);
                var postUser = await UnitOfWork.UserRepository.FindByPrimaryKey(post.UserId);

                post.User = postUser;

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
            }
            catch(Exception e)
            {

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
