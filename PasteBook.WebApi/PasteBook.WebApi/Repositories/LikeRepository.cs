using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Repositories
{
    public interface ILikeRepository : IBaseRepository<Like>
    {

    }

    public class LikeRepository : GenericRepository<Like>, ILikeRepository
    {
        public LikeRepository(PasteBookDb context) : base(context)
        {

        }
    }
}
