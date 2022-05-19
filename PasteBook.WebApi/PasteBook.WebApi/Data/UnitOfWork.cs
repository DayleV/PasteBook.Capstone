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
        public ILikeRepository LikeRepository { get; }
        public IUserFriendRepository UserFriendRepository { get; }
        public IAuthenticationRepository AuthenticationRepository { get; }
        public IPhotoRepository PhotoRepository { get; }
        public INotificationRepository NotificationRepository { get; }
        public ITimelineRepository TimelineRepository { get; }
    }

    public class UnitOfWork : IUnitOfWork, IDisposable
    {

        private PasteBookDb context;

        public IUserRepository UserRepository { get; private set; }
        public IUserFriendRepository UserFriendRepository { get; private set; }
        public ICommentRepository CommentRepository { get; private set; }
        public IAlbumRepository AlbumRepository { get; private set; }
        public IPostRepository PostRepository { get; private set; }
        public ILikeRepository LikeRepository { get; private set; }
        public IAuthenticationRepository AuthenticationRepository { get; private set; }
        public IPhotoRepository PhotoRepository { get; private set; }
        public INotificationRepository NotificationRepository { get; private set; }
        public ITimelineRepository TimelineRepository { get; private set; }

        public UnitOfWork(PasteBookDb context)
        {
            this.context = context;
            this.UserRepository = new UserRepository(context);
            this.UserFriendRepository = new UserFriendRepository(context);
            this.CommentRepository = new CommentRepository(context);
            this.AlbumRepository = new AlbumRepository(context);
            this.PostRepository = new PostRepository(context);
            this.LikeRepository = new LikeRepository(context);
            this.PhotoRepository = new PhotoRepository(context);
            this.AuthenticationRepository = new AuthenticationRepository(context);
            this.NotificationRepository = new NotificationRepository(context);
            this.TimelineRepository = new TimelineRepository(context);
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
