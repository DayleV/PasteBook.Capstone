using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Repositories
{
    public interface IAlbumRepository : IBaseRepository<Album>
    {
    }
    public class AlbumRepository : GenericRepository<Album>, IAlbumRepository
    {
        public AlbumRepository(PasteBookDb context) : base(context)
        {
        }
    }
}
