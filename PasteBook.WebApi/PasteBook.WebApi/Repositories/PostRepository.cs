using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace PasteBook.WebApi.Repositories
{
    public interface IPostRepository : IBaseRepository<Post>
    {
    }
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        public PostRepository(PasteBookDb context) : base(context)
        {

        }
    }
}
