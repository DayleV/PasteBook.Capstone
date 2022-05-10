using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Repositories
{
    public interface IAuthenticationRepository : IBaseRepository<Authentication>
    {
        public Task<Authentication> HashPassword(int id, string password);
    }
    public class AuthenticationRepository : GenericRepository<Authentication>, IAuthenticationRepository
    {
        public AuthenticationRepository(PasteBookDb context) : base(context)
        {
        }
        public async Task<Authentication> HashPassword(int userId, string password)
        {
            byte[] hashedPassword, saltKey;
            using (var hmac = new HMACSHA512())
            {
                saltKey = hmac.Key;
                hashedPassword = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            Authentication authentication = new Authentication
            {
                UserId = userId,
                Password = hashedPassword,
                PasswordKey = saltKey
            };
            await Insert(authentication);
            await this.Context.SaveChangesAsync();
            return authentication;
        }
    }
}
