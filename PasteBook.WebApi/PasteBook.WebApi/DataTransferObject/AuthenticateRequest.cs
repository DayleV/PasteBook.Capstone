using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.DataObjectTransfer
{
    public class AuthenticateRequest
    {
        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
