using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Repositories
{
    public interface ICommentRepository : IBaseRepository<Comment>
    {
    }
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(PasteBookDb context) : base(context)
        {
        }
    }
}
