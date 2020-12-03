using DoctorHouse.DLL;
using DoctorHouse.DLL.Entity;
using DoctorHouse.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace DoctorHouse.Infrastructure.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly UserManager<DbUser> userManager;
        private readonly EFContext context;
        private readonly IConfiguration configuration;
        public JwtTokenService(UserManager<DbUser> userManager, EFContext context,
            IConfiguration configuration)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.context = context;
        }
        public string CreateToken(DbUser user)
        {
            var roles = userManager.GetRolesAsync(user).Result;
            roles = roles.OrderBy(x => x).ToList();
            //var query = _context.Users.AsQueryable();
            //var image = user.Image;

            //if (image == null)
            //{
            //    image = _configuration.GetValue<string>("DefaultImage");
            //}


            List<Claim> claims = new List<Claim>()
            {
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.UserName),
                //new Claim("image",image)
            };

            claims.AddRange(roles.Select(x => new Claim(ClaimTypes.Role, x)));

            //foreach (var role in roles)
            //{
            //    claims.Add(new Claim(ClaimTypes.Role, role));
            //}

            //var now = DateTime.UtcNow;
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<String>("JwtKey")));
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
