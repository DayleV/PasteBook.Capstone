using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Models
{
    public class Photo
    {
        [Key]
        public int PhotoId { get; set; }
        public int AlbumId { get; set; }
        public string Image { get; set; }
        public Album Album { get; set; }
    }
}
