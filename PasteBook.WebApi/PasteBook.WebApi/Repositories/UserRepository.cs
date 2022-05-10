using PasteBook.WebApi.Data;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> Register(UserRegistration user);
    }
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(PasteBookDb context) : base(context)
        {
        }

        public async Task<User> Register(UserRegistration user)
        {
            User secureUser = new User
            {
                EmailAddress = user.EmailAddress,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate,
                Gender = user.Gender,
                MobileNumber = user.MobileNumber,
            };
            await Insert(secureUser);
            return secureUser;
        }

        
    }
}
