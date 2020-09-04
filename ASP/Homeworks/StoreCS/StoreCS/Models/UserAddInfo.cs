using System.ComponentModel.DataAnnotations;

namespace StoreCS.Models
{
    public class UserAddInfo
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
        public string Image { get; set; }
        [Required]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}