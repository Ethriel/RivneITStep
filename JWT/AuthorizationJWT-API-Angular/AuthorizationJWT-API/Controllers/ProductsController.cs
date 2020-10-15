using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;
using DataAccess.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelsDTO.Models;
using ModelsDTO.Models.Result;

namespace AuthorizationJWT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : Controller
    {
        private readonly AppDbContext context;

        public ProductsController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpGet("get")]
        public IEnumerable<ProductDTO> GetProducts()
        {
            var products = context.Products
                                  .ToArray()
                                  .Select(x =>
                                  new ProductDTO
                                  {
                                      Description = x.Description,
                                      Id = x.Id,
                                      ImageURL = x.ImageURL,
                                      Price = x.Price,
                                      Title = x.Title
                                  });

            return products;
        }

        [HttpPost("add")]
        public ResultDTO AddProduct([FromBody] ProductDTO model)
        {
            var product = new Product
            {
                Description = model.Description,
                ImageURL = model.ImageURL,
                Price = model.Price,
                Title = model.Title
            };

            context.Products.Add(product);

            context.SaveChanges();

            return new ResultDTO
            {
                Message = "Ok",
                Status = 200
            };
        }
        [HttpPost("delete")]
        public ResultDTO DeleteProduct([FromBody] int id)
        {
            var product = context.Products.FirstOrDefault(x => x.Id.Equals(id));

            context.Products.Remove(product);

            context.SaveChanges();

            return new ResultDTO
            {
                Message = "Ok",
                Status = 200
            };
        }
    }
}
