using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entity
{
    public class UserMoreInfo
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ImageURL { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}
