using PasteBook.WebApi.Models;
namespace PasteBook.WebApi.DataTransferObject
{
    public class ChangePasswordRequest
    {
        public int UserId { get; set; }
        public string? EmailAddress { get; set; }
        public string OldPassword { get; set; }
        public string? NewPassword { get; set; }

    }
}
