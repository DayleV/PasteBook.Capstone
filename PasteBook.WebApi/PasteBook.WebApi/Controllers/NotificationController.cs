using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Helpers;
using PasteBook.WebApi.Services;
using PasteBook.WebApi.DataObjectTransfer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using PasteBook.WebApi.Data;
using System.Threading.Tasks;
using System.Linq;
using PasteBook.WebApi.DataTransferObject;
using PasteBook.WebApi.Models;
using System;

namespace PasteBook.WebApi.Controllers
{
    [Route("notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        public NotificationController(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            var notifs = await UnitOfWork.NotificationRepository.FindAll();
            return Ok(notifs);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Notification notif)
        {
            if (ModelState.IsValid)
            {
                var newNotif = await UnitOfWork.NotificationRepository.Insert(notif);
                await UnitOfWork.CommitAsync();

                return StatusCode(StatusCodes.Status201Created, newNotif);
            }
            return BadRequest();
        }
    }
}
