using System.ComponentModel.DataAnnotations;

namespace GameStoreDAL.Entities
{
    public class Game
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        public int Year { get; set; }
        [StringLength(1000)]
        public string Description { get; set; }
        public string Image { get; set; }
        [Required]
        public int Price { get; set; }
        //public int? GenreId { get; set; }
        public Genre Genre { get; set; }
        //public int? DeveloperId { get; set; }
        public Developer Developer { get; set; }
    }
}
