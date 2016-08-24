using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using igGridCrudCodeFirstDemo.Entities;

namespace igGridCrudCodeFirstDemo.Models
{
    public class ProductInitalizeDB : DropCreateDatabaseIfModelChanges<ProductContext>
    {
        protected override void Seed(ProductContext context)
        {
            context.Products.Add(new Product
            {
                Id= "1", 
                InStock = true,
                Name = "Sugar",
                Price = 30
            });
            context.Products.Add(new Product
            {
                Id = "2",
                InStock = false,
                Name = "Rice",
                Price = 300
            });
            context.SaveChanges();

            base.Seed(context);     
        }
    }
}