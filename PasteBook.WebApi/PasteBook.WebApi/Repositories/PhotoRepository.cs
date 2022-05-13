using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Repositories
{
    public interface IPhotoRepository : IBaseRepository<Photo>
    {
    }
    public class PhotoRepository : GenericRepository<Photo>, IPhotoRepository
    {
        public PhotoRepository(PasteBookDb context) : base(context)
        {
        }
    }
}
