using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        public AlbumController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAlbums()
        {
            var albums = await UnitOfWork.AlbumRepository.FindAll();
            return Ok(albums);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbumById(int id)
        {
            var album = await UnitOfWork.AlbumRepository.FindByPrimaryKey(id);
            if (album is object)
            {
                return Ok(album);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Album album)
        {
            if (ModelState.IsValid)
            {
                var newAlbum = await UnitOfWork.AlbumRepository.Insert(album);
                await UnitOfWork.CommitAsync();

                return StatusCode(StatusCodes.Status201Created, newAlbum);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var album = await UnitOfWork.AlbumRepository.FindByPrimaryKey(id);
            if (album != null)
            {
                UnitOfWork.AlbumRepository.Delete(album);
                await UnitOfWork.CommitAsync();
                return Ok(album);
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlbum(int id, [FromBody] Album album)
        {
            if (id != album.AlbumId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                UnitOfWork.AlbumRepository.Update(album);
                await UnitOfWork.CommitAsync();
                return Ok(album);
            }
            return BadRequest();
        }
    }
}
