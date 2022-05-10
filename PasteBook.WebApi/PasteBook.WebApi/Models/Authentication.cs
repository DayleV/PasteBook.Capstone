namespace PasteBook.WebApi.Models
{
    public class Authentication
    {
        public int AuthenticationId { get; set; }
        public int UserId { get; set; }
        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }
    }
}
