using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.DataObjectTransfer
{
    public class AuthenticateResponse
    {
        //public int AuthId { get; set; }
        //public int UserId { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            //AuthId = user.AuthenticationId;
            //UserId = user.UserId;
            Token = token;
        }
    }
}
