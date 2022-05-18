using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Repositories
{
    public interface INotificationRepository : IBaseRepository<Notification>
    {
    }
    public class NotificationRepository : GenericRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(PasteBookDb context) : base(context)
        {
        }
    }
}
