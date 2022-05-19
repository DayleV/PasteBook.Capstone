using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace PasteBook.WebApi.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public int AuthenticationId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //updated by ward
        [Column(TypeName="Date")]
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public string MobileNumber { get; set; }
        public string ProfilePicture { get; set; }
        public string ProfileBlurb { get; set; }
        public string WallUserId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Post> Posts { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<UserFriend> UserFriends { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Album> Albums { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Notification> Notifications { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public Authentication Authentication { get; set; }
    }
}
