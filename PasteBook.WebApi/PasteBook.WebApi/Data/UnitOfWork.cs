using PasteBook.WebApi.Repositories;
using System;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Data
{
    public interface IUnitOfWork
    {
        Task CommitAsync();

        public IUserRepository UserRepository { get; }
        public ICommentRepository CommentRepository { get; }
        public IAlbumRepository AlbumRepository { get; }
        public IPostRepository PostRepository { get; }
    }

    public class UnitOfWork : IUnitOfWork, IDisposable
    {

        private PasteBookDb context;

        public IUserRepository UserRepository { get; private set; }
        public ICommentRepository CommentRepository { get; private set; }
        public IAlbumRepository AlbumRepository { get; private set; }
        public IPostRepository PostRepository { get; private set; }

        public UnitOfWork(PasteBookDb context)
        {
            this.context = context;
            this.UserRepository = new UserRepository(context);
            this.CommentRepository = new CommentRepository(context);
            this.AlbumRepository = new AlbumRepository(context);
            this.PostRepository = new PostRepository(context);
        }

        public async Task CommitAsync()
        {
            await this.context.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.context.Dispose();
        }
    }
}
