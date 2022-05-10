using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Models
{
    public class Album
    {
        [Key]
        public int AlbumId { get; set; }
        public int UserId { get; set; }
        public string AlbumName { get; set; }

        public ICollection<Photo> Photos { get; set; }
        public User User { get; set; }
    }
}
