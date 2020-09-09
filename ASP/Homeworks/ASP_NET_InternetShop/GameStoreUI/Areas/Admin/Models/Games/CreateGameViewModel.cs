using System.ComponentModel.DataAnnotations;

namespace GameStoreUI.Areas.Admin.Models.Games
{
    public class CreateGameViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Year is required")]
        public int Year { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }

        public string Image { get; set; }
        [Required(ErrorMessage = "Price is required")]
        public int Price { get; set; }

        [Required(ErrorMessage = "Genre is required")]
        public string Genre { get; set; }

        [Required(ErrorMessage = "Developer is required")]
        public string Developer { get; set; }
    }
}