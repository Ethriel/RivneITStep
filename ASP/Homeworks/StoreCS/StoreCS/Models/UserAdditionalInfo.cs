using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreCS.Models
{
    [Table("UserAddInfo")]
    public class UserAdditionalInfo
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