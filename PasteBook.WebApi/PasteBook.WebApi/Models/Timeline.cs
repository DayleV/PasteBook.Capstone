using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace PasteBook.WebApi.Models
{
    public class Timeline
    {
        [Key]
        public int TimelineId { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Post> Posts { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public User User { get; set; }
    }
}
