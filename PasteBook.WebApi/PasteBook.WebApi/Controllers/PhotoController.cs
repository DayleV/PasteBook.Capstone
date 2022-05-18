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

        [HttpGet("{albumId}")]
        public async Task<IActionResult> GetImagesByAlbumId(int albumId)
        {
            List<string> photos = new List<string>();
            var albumPhotos = await this.UnitOfWork.PhotoRepository.Find(p => p.AlbumId == albumId);
            foreach (Photo photo in albumPhotos)
            {
                string photoUrl = photo.Image;
                photos.Add(photoUrl);
            }
            return Ok(photos);
        }
    }
}
