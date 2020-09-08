using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace StoreCS.Areas.ManageAccount.Models
{
    public class UserAddInfoViewModel
    {
        //public string Id { get; set; }

        [Required(ErrorMessage = "First name is required")]
        [DisplayName("First name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "First name is required")]
        [DisplayName("Last name")]
        public string LastName { get; set; }
        public string Image { get; set; }
    }
}