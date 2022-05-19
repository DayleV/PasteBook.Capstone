using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Models;
using PasteBook.WebApi.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("photos")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        public IPhotoService PhotoService { get; private set; }


        public PhotoController(IUnitOfWork unitOfWork, IPhotoService PhotoService)
        {
            this.UnitOfWork = unitOfWork;
            this.PhotoService = PhotoService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImages()
        {
            try
            {
                var files = HttpContext.Request.Form.Files;
                var albumId = Convert.ToInt32(HttpContext.Request.Form["albumId"]);
                
                Album album = await UnitOfWork.AlbumRepository.FindByPrimaryKey(albumId);
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        var path = this.PhotoService.SavePath(file, album.UserId);
                        var newFileName = this.PhotoService.SavePath(file, album.UserId);
                        Photo photo = new Photo();
                        photo.AlbumId = album.AlbumId;
                        photo.Image = newFileName;
                        photo.DateTime = DateTime.Now;
                        await this.UnitOfWork.PhotoRepository.Insert(photo);
                    }

                    await this.UnitOfWork.CommitAsync();
                    return StatusCode(StatusCodes.Status201Created, new { message = "Photo Uploaded" });
                }
            }
            catch (Exception e)
            {
            }
            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetImages()
        {
            var images = await this.UnitOfWork.PhotoRepository.FindAll();
            return Ok(images);
        }

        [HttpGet("byAlbum/{albumId}")]
        public async Task<IActionResult> GetImagesByAlbumId(int albumId)
        {
            List<Photo> photos = new List<Photo>();
            var albumPhotos = await this.UnitOfWork.PhotoRepository.Find(p => p.AlbumId == albumId);
            foreach (Photo photo in albumPhotos)
            {
                photos.Add(photo);
            }
            return Ok(photos);
        }

        [HttpPost("uploadprofilephoto")]
        public async Task<IActionResult> UploadProfileImages()
        {
            try
            {
                var files = HttpContext.Request.Form.Files;
                var userId = Convert.ToInt32(HttpContext.Request.Form["userId"]);

                User user = await UnitOfWork.UserRepository.FindByPrimaryKey(userId);
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        var path = this.PhotoService.SaveProfile(file, user.UserId);
                        var newFileName = this.PhotoService.SavePath(file, user.UserId);
                        Photo photo = new Photo();
                        photo.Image = newFileName;
                        photo.DateTime = DateTime.Now;
                        user.ProfilePicture = photo.Image;
                        this.UnitOfWork.UserRepository.Update(user);
                        await this.UnitOfWork.PhotoRepository.Insert(photo);
                        
                    }
                    await this.UnitOfWork.CommitAsync();
                    return StatusCode(StatusCodes.Status201Created, new { message = "Profile Photo Uploaded" });
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
            }
            return BadRequest();
        }
    }
}
