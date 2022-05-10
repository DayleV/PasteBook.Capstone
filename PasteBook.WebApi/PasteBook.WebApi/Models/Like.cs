using System;
using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Models
{
    public class Like
    {
        [Key]
        public int LikeId { get; set; }
        public int UserId { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
