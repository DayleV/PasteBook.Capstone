using System.Collections.Generic;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.DataTransferObject
{
    public class PostDTO
    {
        public Post Post { get; set; }
        public IEnumerable<Comment> Comments { get; set; }
        public IEnumerable<Like> Likes { get; set; }
    }

    public class NewsFeedItem
    {
        public Post Post { get; set; }
        public int CommentCount { get; set; }
        public int LikeCount { get; set; }
    }

    public class AlbumItem
    {
        public Album Album { get; set; }
    }
}
