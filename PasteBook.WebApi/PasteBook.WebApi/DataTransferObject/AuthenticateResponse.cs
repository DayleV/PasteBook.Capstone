using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.DataObjectTransfer
{
    public class AuthenticateResponse
    {
        public string Token { get; set; }

        public AuthenticateResponse(string token)
        {
            Token = token;
        }
    }
}
