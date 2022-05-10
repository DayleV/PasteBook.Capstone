using System;
using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Models
{
    public class UserFriend
    {
        [Key]
        public int UserFriendId { get; set; }
        public int UserId { get; set; }
        public int FriendId { get; set; }
        public User User { get; set; }
    }
}
