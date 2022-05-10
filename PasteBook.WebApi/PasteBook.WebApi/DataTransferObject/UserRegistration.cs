namespace PasteBook.WebApi.DataObjectTransfer
{
    public class UserRegistration
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BirthDate { get; set; }
        public string Gender { get; set; }
        public string MobileNumber { get; set; }
    }
}
