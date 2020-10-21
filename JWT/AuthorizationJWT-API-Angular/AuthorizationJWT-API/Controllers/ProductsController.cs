using DataAccess;
using DataAccess.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModelsDTO.Models;
using ModelsDTO.Models.Result;
using System.Collections.Generic;
using System.Linq;

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

        [Authorize(Roles = "Admin")]
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

        [HttpGet("search")]
        public IEnumerable<ProductDTO> SearchProduct([FromQuery] string search)
        {
            if (string.IsNullOrWhiteSpace(search))
            {
                return GetProducts();
            }

            search = search.ToLower();
            var products = context.Products
                                  .Where(x => x.Title.ToLower().Contains(search))
                                  .Select(x => new ProductDTO
                                  {
                                      Description = x.Description,
                                      Id = x.Id,
                                      ImageURL = x.ImageURL,
                                      Price = x.Price,
                                      Title = x.Title
                                  }).ToArray();

            return products;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("delete")]
        public IEnumerable<ProductDTO> DeleteProduct([FromBody] DeleteProductDTO model)
        {
            var product = context.Products.FirstOrDefault(x => x.Id.Equals(model.Id));

            context.Products.Remove(product);

            context.SaveChanges();

            return GetProducts();
        }
    }
}
