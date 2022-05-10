namespace PasteBook.WebApi.Models
{
    public class Authentication
    {
        public int AuthenticationId { get; set; }
        public string EmailAddress { get; set; }
        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }
        public User User { get; set; }
    }
}
