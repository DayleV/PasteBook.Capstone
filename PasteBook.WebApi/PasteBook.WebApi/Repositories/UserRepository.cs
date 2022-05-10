using PasteBook.WebApi.Data;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;

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
