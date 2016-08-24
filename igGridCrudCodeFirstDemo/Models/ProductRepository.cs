using igGridCrudCodeFirstDemo.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using igGridCrudCodeFirstDemo.Entities;

namespace igGridCrudCodeFirstDemo.Models
{
    public class ProductRepository : IProductRepository
    {
        ProductContext context = new ProductContext();

        public void Add(Product p)
        {
            context.Products.Add(p);
            context.SaveChanges();
        }

        public void Edit(Product p)
        {
            context.Entry(p).State = System.Data.Entity.EntityState.Modified;
        }

        public Product FindById(int Id)
        {
           var p = context.Products.Find(Id);
            return p; 
        }

        public IEnumerable<Product> GetProducts()
        {
            return context.Products;
        }

        public void Remove(int Id)
        {
            Product p = context.Products.Find(Id);
            context.Products.Remove(p);
            context.SaveChanges();
        }
    }
}