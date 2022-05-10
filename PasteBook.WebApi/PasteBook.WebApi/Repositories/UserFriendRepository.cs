using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Repositories
{
    public interface IUserFriendRepository : IBaseRepository<UserFriend>
    {
    }
    public class UserFriendRepository : GenericRepository<UserFriend>, IUserFriendRepository
    {
        public UserFriendRepository(PasteBookDb context) : base(context)
        {
        }
    }
}
