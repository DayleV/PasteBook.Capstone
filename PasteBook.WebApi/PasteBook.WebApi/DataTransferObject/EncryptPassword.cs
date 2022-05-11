namespace PasteBook.WebApi.DataTransferObject
{
    public class EncryptPassword
    {
        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }
    }
}
