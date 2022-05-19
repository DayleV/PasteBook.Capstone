using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PasteBook.WebApi.DataObjectTransfer;
using PasteBook.WebApi.Helpers;
using PasteBook.WebApi.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PasteBook.WebApi.Services
{
    public interface IUserService
    {
        public AuthenticateResponse GenerateResponse(User user);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings appSettings;
        public UserService(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
        }
        public AuthenticateResponse GenerateResponse(User user)
        {
            var token = generateJwtToken(user);

            return new AuthenticateResponse(token);
        }
        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserId", user.UserId.ToString()),
                    new Claim("FirstName", user.FirstName),
                    new Claim("LastName", user.LastName),
                    new Claim("UserName", user.UserName),
                    new Claim("ProfilePicture", user.ProfilePicture)
                }),
                Expires = DateTime.UtcNow.AddDays(this.appSettings.DurationInDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = appSettings.Audience,
                Issuer = appSettings.Issuer
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
