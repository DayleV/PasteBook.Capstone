using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace PasteBook.WebApi.Services
{
    public interface IPhotoService
    {
        public string SavePath(IFormFile file, int userId);
    }
    public class PhotoService: IPhotoService
    {
        public IWebHostEnvironment Host;
        public PhotoService(IWebHostEnvironment Host)
        {
            this.Host = Host;
        }

        public string SavePath(IFormFile file, int userId)
        {
            FileInfo fi = new FileInfo(file.FileName);
            var newFileName = "Image_" + DateTime.Now.TimeOfDay.Milliseconds + fi.Extension;
            var newPath = Host.ContentRootPath + "\\Images\\" + userId + "\\" ;
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            var path = Path.Combine("", newPath + newFileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return path;
        }
    }
}
