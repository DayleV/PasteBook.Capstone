using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.DataObjectTransfer
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            Id = user.UserId;
            Token = token;
        }
    }
}
