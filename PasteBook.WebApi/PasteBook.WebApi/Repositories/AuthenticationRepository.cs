using PasteBook.WebApi.Data;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Models;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Linq;
using System.Text;

namespace PasteBook.WebApi.Repositories
{
    public interface IAuthenticationRepository : IBaseRepository<Authentication>
    {
        public Task<Authentication> EncryptAuthentication(UserRegistration user);
        public Task<User> Authenticate(AuthenticateRequest model);
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
        public async Task<User> Authenticate(AuthenticateRequest model)
        {
            var userAuth = Context.Authentications.Where(a => a.EmailAddress.Equals(model.EmailAddress)).FirstOrDefault();

            if (userAuth == null) return null;

            using (var hmac = new HMACSHA512(userAuth.PasswordKey))
            {
                var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password));
                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != userAuth.Password[i])
                        return null;
                }
            }

            var user = Context.Users.Where(u => u.AuthenticationId.Equals(userAuth.AuthenticationId)).FirstOrDefault();
            return user;
        }
    }
}
