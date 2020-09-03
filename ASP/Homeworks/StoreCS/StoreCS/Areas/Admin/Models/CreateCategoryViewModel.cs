using System.ComponentModel.DataAnnotations;

namespace StoreCS.Areas.Admin.Models
{
    public class CreateCategoryViewModel
    {
        [Required(ErrorMessage = "Category name is required")]
        public string Name { get; set; }
    }
}