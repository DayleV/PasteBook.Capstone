using PasteBook.WebApi.Data;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Models;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Linq;
using System.Text;
using PasteBook.WebApi.DataTransferObject;
using System.Text.RegularExpressions;
using System;

namespace PasteBook.WebApi.Repositories
{
    public interface IAuthenticationRepository : IBaseRepository<Authentication>
    {
        public Task<Authentication> EmailExist(string email);
        public Task<Authentication> InsertEncryptedUser(UserRegistration user, EncryptPassword encrypt);
    }
    public class AuthenticationRepository : GenericRepository<Authentication>, IAuthenticationRepository
    {
        public AuthenticationRepository(PasteBookDb context) : base(context)
        {
        }
        public async Task<Authentication> EmailExist(string email)
        {
            var auth = await Find(e => e.EmailAddress.Equals(email));
            return auth.FirstOrDefault();
        }
        public async Task<Authentication> InsertEncryptedUser(UserRegistration user, EncryptPassword encrypt)
        {
            Random rnd = new Random();
            Authentication authentication = new Authentication
            {
                EmailAddress = user.EmailAddress,
                Password = encrypt.Password,
                PasswordKey = encrypt.PasswordKey,
                User = new User
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    BirthDate = user.BirthDate,
                    Gender = user.Gender,
                    MobileNumber = user.MobileNumber,
                    ProfilePicture = "default-picture.png"
                }
            };
            await Insert(authentication);
            await this.Context.SaveChangesAsync();
            return authentication;     
        }
    }
}
