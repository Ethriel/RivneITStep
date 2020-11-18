using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using LibIT.Web.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace LibIT.Web.Services
{
    public interface IJwtTokenService
    {
        string CreateToken(DbUser user, HttpRequest httpRequest);
    }

    public class JwtTokenService : IJwtTokenService
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EfContext _context;
        private readonly IConfiguration _configuration;

        public JwtTokenService(UserManager<DbUser> userManager, EfContext context,
            IConfiguration configuration)
        {
            _configuration = configuration;
            _userManager = userManager;
            _context = context;
        }
        public string CreateToken(DbUser user, HttpRequest httpRequest)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            roles = roles.OrderBy(x => x).ToList();
            var query = _context.Users.AsQueryable();
            var defaultImage = _configuration.GetValue<string>("DefaultImage");
            var serverPath = $"http://{httpRequest.Host.Value}";

            var image = user.Image;
            if (!image.Contains("http"))
            {
                image = string.Concat(serverPath, "/Files/", user.Image);
            }
            //if (image == null)
            //{
            //    image = defaultImage;
            //}


            List<Claim> claims = new List<Claim>()
            {
                new Claim("id",user.Id.ToString()),
                new Claim("name",user.UserName),
                new Claim("image",image),
                new Claim("defaultImage", defaultImage)
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            //var now = DateTime.UtcNow;
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<String>("JwtKey")));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(1000),
                claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}