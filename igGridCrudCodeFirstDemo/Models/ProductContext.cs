using igGridCrudCodeFirstDemo.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace igGridCrudCodeFirstDemo.Models
{
    public class ProductContext : DbContext
    {
        public ProductContext() : base("name=pappconnectionstring")
        {

        }
        public DbSet<Product> Products { get; set;}
    }
}