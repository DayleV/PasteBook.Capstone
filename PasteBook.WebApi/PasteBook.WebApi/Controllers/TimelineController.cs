using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("users")]
    [ApiController]
    public class TimelineController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        public TimelineController(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTimelineByUserId(int id)
        {
            try
            {
                var timeline = await UnitOfWork.TimelineRepository.Find(t => t.UserId.Equals(id));
                if (timeline is object)
                {
                    return Ok(timeline);
                }
            }
            catch(Exception e)
            {
                
            }
            return NotFound();
        }
    }
}
