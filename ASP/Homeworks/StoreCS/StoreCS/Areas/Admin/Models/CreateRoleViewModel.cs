using System.ComponentModel.DataAnnotations;

namespace StoreCS.Areas.Admin.Models
{
    public class CreateRoleViewModel
    {
        [Required(ErrorMessage = "Role name is required")]
        public string Name { get; set; }
    }
}