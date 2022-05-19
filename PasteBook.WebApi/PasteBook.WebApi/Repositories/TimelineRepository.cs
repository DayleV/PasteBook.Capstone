using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.Repositories
{
    public interface ITimelineRepository : IBaseRepository<Timeline>
    {
    }
    public class TimelineRepository : GenericRepository<Timeline>, ITimelineRepository
    {
        public TimelineRepository(PasteBookDb context) : base(context)
        {
        }
    }
}
