namespace PasteBook.WebApi.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }

        public int DurationInDays { get; set; }
    }
}
