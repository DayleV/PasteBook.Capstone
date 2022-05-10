using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Web
{
    public class AuthenticateRequest
    {
        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}
