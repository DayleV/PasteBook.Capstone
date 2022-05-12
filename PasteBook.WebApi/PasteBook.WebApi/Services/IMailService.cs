using PasteBook.WebApi.DataObjectTransfer;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(UserRegistration user);
    }
}
