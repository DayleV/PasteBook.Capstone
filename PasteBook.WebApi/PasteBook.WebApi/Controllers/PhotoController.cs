using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using PasteBook.WebApi.Services;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("photos")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        public IWebHostEnvironment Host;
        public IUnitOfWork UnitOfWork { get; private set; }
        public IPhotoService PhotoService { get; private set; }
        public PhotoController(IWebHostEnvironment Host, IUnitOfWork unitOfWork, IPhotoService PhotoService)
        {
            this.Host = Host;
            this.UnitOfWork = unitOfWork;
            this.PhotoService = PhotoService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImages()
        {
            try
            {
                var files = HttpContext.Request.Form.Files;
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        var path = this.PhotoService.SavePath(file);
                        Photo photo = new Photo();
                        photo.AlbumId = 1;
                        photo.Image = path;
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
    }
}
