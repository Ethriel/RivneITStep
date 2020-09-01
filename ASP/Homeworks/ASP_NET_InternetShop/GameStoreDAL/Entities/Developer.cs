using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GameStoreDAL.Entities
{
    public class Developer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        public ICollection<Game> Games { get; set; }

        public Developer()
        {
            Games = new HashSet<Game>();
        }
    }
}
