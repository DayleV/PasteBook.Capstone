using System;
using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string CommentContent { get; set; }
        public string CommentDate { get; set; }
        public Post Post { get; set; }

    }
}
