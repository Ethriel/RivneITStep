using System.ComponentModel.DataAnnotations;

namespace DoctorHouse.Infrastructure.Model
{
    public class SignInModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string ReturnUrl { get; set; }
    }
}
