using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PasteBook.WebApi.Data;
using PasteBook.WebApi.Models;
using PasteBook.WebApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test
{
    class DB : PasteBookDb
    {   
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ConfigurationHelper.GetInstance().GetProperty<string>("ConnectionString"));
            }
        }
    }
    public class Program
    {
        static void Main(string[] args)
        {
            DB context = new DB();
            var users = context.Users.ToList();

            Console.WriteLine(JsonConvert.SerializeObject(users));
        }
    }
}
