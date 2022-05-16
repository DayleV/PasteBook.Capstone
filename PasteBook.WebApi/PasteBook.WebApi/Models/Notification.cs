using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Models
{
    public enum FriendAction
    {
        AddFriend, AddPost, AddLike, 
    }

    public class Notification
    {
        [Key]
        public int NotificationId { get; set; }
        public bool NotifReadStatus { get; set; }
        public DateTime NotifDateTime { get; set; }
        [Required]
        public int FriendId { get; set; }
        public int? CommentId { get; set; }
        public int? PostId { get; set; }
        public int? LikeId { get; set; }
        public int? UserFriendId { get; set; }

        //Foreign Key
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
