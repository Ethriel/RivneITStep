using System.ComponentModel.DataAnnotations;

namespace GameStoreUI.Models
{
    public class CreateDeveloperViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
    }
}