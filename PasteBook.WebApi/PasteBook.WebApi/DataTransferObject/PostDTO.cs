using System.Collections.Generic;
using PasteBook.WebApi.Models;

namespace PasteBook.WebApi.DataTransferObject
{
    public class PostDTO
    {
        public IEnumerable<Post> Post { get; set; }
        public IEnumerable<Comment> Comments { get; set; }
        public IEnumerable<Like> Likes { get; set; }
    }
}
