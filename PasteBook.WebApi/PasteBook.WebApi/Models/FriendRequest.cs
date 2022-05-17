using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PasteBook.WebApi.Models
{
    public enum requestStatus { 
        Pending, Ignored, Accepted
    }

    public class FriendRequest
    {
        [Key]
        public int FriendRequestId { get; set; }
        
        //ID of Friend Added
        public int FriendId { get; set; }

        public requestStatus RequestStatus { get; set; }

        //Foreign Key
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
