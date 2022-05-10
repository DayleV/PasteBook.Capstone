using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
    }
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(PasteBookDb context) : base(context)
        {
        }
    }
}
