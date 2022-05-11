using PasteBook.WebApi.DataTransferObject;
using PasteBook.WebApi.Models;
using System.Security.Cryptography;
using System.Text;

namespace PasteBook.WebApi.Services
{
    public interface IAuthenticationService
    {
        public EncryptPassword Encrypt(string password);
        public byte[] EncryptToAuthenticate(Authentication auth, string Password);
        public bool Authenticate(Authentication auth, string Password);
    }
    public class AuthenticationService: IAuthenticationService
    {
        public bool Authenticate(Authentication auth, string Password)
        {
            var hashedPassword = EncryptToAuthenticate(auth, Password);
            for (int i = 0; i < hashedPassword.Length; i++)
            {
                if (hashedPassword[i] != auth.Password[i])
                    return false;
            }
            return true;
        }
        public byte[] EncryptToAuthenticate(Authentication auth, string Password)
        {
            using (var hmac = new HMACSHA512(auth.PasswordKey))
            {
                return hmac.ComputeHash(Encoding.UTF8.GetBytes(Password));                
            }
        }

        public EncryptPassword Encrypt(string password)
        {
            EncryptPassword encryptPassword = new EncryptPassword();
            using (var hmac = new HMACSHA512())
            {
                encryptPassword.PasswordKey = hmac.Key;
                encryptPassword.Password = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            return encryptPassword;
        }
    }
}
