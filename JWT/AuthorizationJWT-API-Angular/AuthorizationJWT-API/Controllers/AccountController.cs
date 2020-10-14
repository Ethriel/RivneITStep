using Authorization_Domain.Interfaces;
using DataAccess;
using DataAccess.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ModelsDTO.Helpers;
using ModelsDTO.Models;
using ModelsDTO.Models.Result;
using System;
using System.Threading.Tasks;

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

        [HttpPost("signup")]
        public async Task<ResultDTO> SignUp([FromBody] SignUpDTO model)
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
                            ImageURL = "default.jpg",
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

        [HttpPost("signin")]
        public async Task<ResultDTO> SignIn([FromBody] SignInDTO model)
        {
            var result = default(ResultDTO);

            if (!ModelState.IsValid)
            {
                var errors = ModelStateCustomValidator.GetErrorsFromModel(ModelState);
                result = new ErrorResultDTO
                {
                    Status = 403,
                    Message = "Invalid sign in attempt",
                    Errors = errors
                };
            }
            else
            {
                var loginResult = await signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (!loginResult.Succeeded)
                {
                    result = new ErrorResultDTO
                    {
                        Status = 403,
                        Message = "Sign in error",
                        Errors = new string[] { "Incorrect email or password" }
                    };
                }
                else
                {
                    var user = await userManager.FindByEmailAsync(model.Email);
                    await signInManager.SignInAsync(user, false);

                    result = new AuthResultDTO
                    {
                        Status = 200,
                        Message = "Ok",
                        Token = JWTTokenService.GenerateToken(user)
                    };
                }
            }

            return result;
        }
    }
}
