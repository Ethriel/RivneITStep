using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Authorization_Domain.Interfaces;
using DataAccess;
using DataAccess.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ModelsDTO.Helpers;
using ModelsDTO.Models;
using ModelsDTO.Models.Result;

namespace AuthorizationJWT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly AppDbContext context;
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly IJWTTokenService JWTTokenService;

        public AccountController(AppDbContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJWTTokenService JWTTokenService)
        {
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.JWTTokenService = JWTTokenService;
        }

        [HttpPost("register")]
        public async Task<ResultDTO> Register([FromBody]SignUpDTO model)
        {
            var result = default(ResultDTO);
            try
            {
                if (!ModelState.IsValid)
                {
                    result = new ErrorResultDTO
                    {
                        Status = 403,
                        Message = "Model is invalid",
                        Errors = ModelStateCustomValidator.GetErrorsFromModel(ModelState)
                    };
                }
                else
                {
                    var user = new AppUser
                    {
                        UserName = model.Email,
                        Email = model.Email,
                        PhoneNumber = model.Phone
                    };

                    var createResult = await userManager.CreateAsync(user, model.Password);

                    if (!createResult.Succeeded)
                    {
                        result = new ErrorResultDTO
                        {
                            Errors = ModelStateCustomValidator.GetErrorsFromIdentityResult(createResult.Errors),
                            Message = "Create error",
                            Status = 500
                        };
                    }
                    else
                    {
                        var userMoreInfo = new UserMoreInfo
                        {
                            Address = model.Address,
                            ImageURL = model.Image,
                            FirstName = model.FirstName,
                            MiddleName = model.MiddleName,
                            LastName = model.LastName,
                            Id = user.Id
                        };

                        var roleResult = await userManager.AddToRoleAsync(user, "User");
                        context.UserMoreInfos.Add(userMoreInfo);
                        context.SaveChanges();
                        result = new ResultDTO
                        {
                            Status = 200,
                            Message = "OK"
                        };
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                result = new ResultDTO
                {
                    Status = 500,
                    Message = ex.Message
                };

                return result;
            }
        }
    }
}
