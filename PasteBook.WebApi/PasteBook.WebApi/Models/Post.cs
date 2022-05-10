using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string PostContent { get; set; }
        public DateTime PostDate { get; set; }
        public User User { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
