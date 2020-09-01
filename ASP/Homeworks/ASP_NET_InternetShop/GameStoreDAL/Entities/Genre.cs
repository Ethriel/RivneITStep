using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GameStoreDAL.Entities
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(20)]
        public string Name { get; set; }
        public ICollection<Game> Games { get; set; }
        public Genre()
        {
            Games = new HashSet<Game>();
        }
    }
}
