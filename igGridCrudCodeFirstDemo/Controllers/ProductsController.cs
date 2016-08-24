using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Infragistics.Web.Mvc;
using igGridCrudCodeFirstDemo.Models;
using igGridCrudCodeFirstDemo.Entities;

namespace igGridCrudCodeFirstDemo.Controllers
{
    public class ProductsController : Controller
    {
        // GET: Products
        public ActionResult Index()
        {
            ProductRepository repo = new ProductRepository();
            IQueryable<Product> products = repo.GetProducts().ToList().AsQueryable();
            GridModel igGrid = new GridModel();
            igGrid.ID = "productgrid";
            igGrid.PrimaryKey = "Id";
            igGrid.DataSource = products;


            return View(igGrid);
        }
    }
}