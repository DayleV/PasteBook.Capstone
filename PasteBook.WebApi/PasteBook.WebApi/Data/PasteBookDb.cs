using Microsoft.EntityFrameworkCore;
using PasteBook.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasteBook.WebApi.Data
{
    public class PasteBookDb: DbContext
    {
        public PasteBookDb()
        {
        }

        public PasteBookDb(DbContextOptions<PasteBookDb> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<UserFriend> UserFriends { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Comment> Comments { get; set; }


        //After migrate, Add connection string to User secrets and comment this 'OnConfiguring' Method
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=9MMBQG3\\TRIAL;Database=PasteBookDb;User Id=sa;Password=P@ssw0rd");
            }
        }
    }
}
