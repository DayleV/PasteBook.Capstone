using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Web
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            Id = user.UserId;
            FirstName = user.FirstName;
            LastName = user.LastName;
            EmailAddress = user.EmailAddress;
            Token = token;
        }
    }
}
