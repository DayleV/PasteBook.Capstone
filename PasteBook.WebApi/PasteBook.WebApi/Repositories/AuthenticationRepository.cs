using PasteBook.WebApi.Data;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Models;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Repositories
{
    public interface IAuthenticationRepository : IBaseRepository<Authentication>
    {
        public Task<Authentication> EncryptAuthentication(UserRegistration user);
    }
    public class AuthenticationRepository : GenericRepository<Authentication>, IAuthenticationRepository
    {
        public AuthenticationRepository(PasteBookDb context) : base(context)
        {
        }
        public async Task<Authentication> EncryptAuthentication(UserRegistration user)
        {
            byte[] hashedPassword, saltKey;
            using (var hmac = new HMACSHA512())
            {
                saltKey = hmac.Key;
                hashedPassword = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(user.Password));
            }
            Authentication authentication = new Authentication
            {
                EmailAddress = user.EmailAddress,
                Password = hashedPassword,
                PasswordKey = saltKey,
                User = new User
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    BirthDate = user.BirthDate,
                    Gender = user.Gender,
                    MobileNumber = user.MobileNumber,
                }
            };
            await Insert(authentication);
            await this.Context.SaveChangesAsync();
            return authentication;
        }
    }
}
