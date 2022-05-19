using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace PasteBook.WebApi.Services
{
    public interface IPhotoService
    {
        public string SavePath(IFormFile file, int userId);
        public string SaveProfile(IFormFile file, int userId);
    }
    public class PhotoService: IPhotoService
    {
        public IWebHostEnvironment _webHostEnvironment;
        public PhotoService(IWebHostEnvironment webHostEnvironment)
        {
            this._webHostEnvironment = webHostEnvironment;
        }

        public string SavePath(IFormFile file, int albumId)
        {
            FileInfo fi = new FileInfo(file.FileName);
            var newFileName = "Image_" + DateTime.Now.ToString("yyyyMMddHHmmss") + albumId + fi.Extension;
            var newPath = _webHostEnvironment.WebRootPath + "\\Images\\";
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            var path = Path.Combine("", newPath + newFileName);
            //var path = newFileName;
            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return newFileName;
        }

        public string SaveProfile(IFormFile file, int userId)
        {
            FileInfo fi = new FileInfo(file.FileName);
            var newFileName = "Image_" + DateTime.Now.ToString("yyyyMMddHHmmss") + userId + fi.Extension;
            var newPath = _webHostEnvironment.WebRootPath + "\\Images\\";
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            var path = Path.Combine("", newPath + newFileName);
            //var path = newFileName;
            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return newFileName;
        }
    }
}
