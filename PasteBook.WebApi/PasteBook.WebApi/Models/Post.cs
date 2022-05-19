using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace PasteBook.WebApi.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        public int TimelineId { get; set; }
        public int UserId { get; set; }
        public string PostContent { get; set; }
        public string WallUserId { get; set; }
        public DateTime PostDate { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public User User { get; set; }

        //To Solve Self Referencing Loop for Post's like and comments, using Mvc.NewtonsoftJson package, (See https://stackoverflow.com/questions/7397207/json-net-error-self-referencing-loop-detected-for-type)

        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Like> Likes { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Comment> Comments { get; set; }
    }
}
