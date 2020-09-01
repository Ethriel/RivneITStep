using System.ComponentModel.DataAnnotations;

namespace GameStoreUI.Models
{
    public class EditGenreViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
    }
}