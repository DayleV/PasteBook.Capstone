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
            return new AuthenticateResponse(user, token);
        }
        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("AuthId", user.AuthenticationId.ToString()),
                    new Claim("UserId", user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(this.appSettings.DurationInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = appSettings.Audience,
                Issuer = appSettings.Issuer
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
