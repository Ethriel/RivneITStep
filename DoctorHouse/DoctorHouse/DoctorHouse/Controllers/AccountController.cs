using DoctorHouse.DLL.Entity;
using DoctorHouse.Helpers;
using DoctorHouse.Infrastructure.Interfaces;
using DoctorHouse.Infrastructure.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DoctorHouse.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AccountController : Controller
    {
        private readonly IJwtTokenService jwtTokenService;
        private readonly SignInManager<DbUser> signInManager;
        private readonly UserManager<DbUser> userManager;

        public AccountController(IJwtTokenService jwtTokenService, SignInManager<DbUser> signInManager, UserManager<DbUser> userManager)
        {
            this.jwtTokenService = jwtTokenService;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn([FromBody] SignInModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var user = await userManager.FindByEmailAsync(model.UserName);

            if (user == null)
            {
                return NotFound($"User email = {model.UserName} was not found");
            }

            var result = await signInManager.PasswordSignInAsync(user, model.Password, false, false);

            if (!result.Succeeded)
            {
                return BadRequest($"Incorrect password!");
            }

            var token = jwtTokenService.CreateToken(user);

            var userInfoModel = new UserInfoModel { Token = token };

            return Ok(userInfoModel);
        }
    }
}
