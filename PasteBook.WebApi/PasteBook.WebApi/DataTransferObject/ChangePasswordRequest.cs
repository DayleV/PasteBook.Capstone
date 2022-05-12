using PasteBook.WebApi.Models;
namespace PasteBook.WebApi.DataTransferObject
{
    public class ChangePasswordRequest
    {
        public int AuthId { get; set; }
        public string? EmailAddress { get; set; }
        public string? NewPassword { get; set; }
        public string OldPassword { get; set; }
    }
}
