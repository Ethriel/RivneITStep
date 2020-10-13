using Authorization_Domain.Interfaces;
using DataAccess;
using DataAccess.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authorization_Domain.Implementations
{
    public class JWTTokenService : IJWTTokenService
    {
        private readonly AppDbContext context;
        private readonly IConfiguration configuration;
        private readonly UserManager<AppUser> userManager;

        public JWTTokenService(AppDbContext context, IConfiguration configuration, UserManager<AppUser> userManager)
        {
            this.context = context;
            this.configuration = configuration;
            this.userManager = userManager;
        }
        public string GenerateToken(AppUser user)
        {
            var roles = userManager.GetRolesAsync(user).Result;

            //var userMoreInfo = context.UserMoreInfos.FirstOrDefault(x => x.Id.Equals(user.Id));

            //var fullName = string.Concat(userMoreInfo.FirstName, " ", userMoreInfo.MiddleName, " ", userMoreInfo.LastName, " ");

            var claims = new List<Claim>()
            {
                new Claim("id", user.Id.ToString()),
                new Claim("email", user.Email.ToString())
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("role", role.ToString()));
            }

            var jwtSecret = configuration["SecretPhrase"];
            var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
            var signInCredentials = new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256);
            var jwtToken = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(7), signingCredentials: signInCredentials);

            var handler = new JwtSecurityTokenHandler();
            var strToken = handler.WriteToken(jwtToken);

            return strToken;
        }
    }
}
