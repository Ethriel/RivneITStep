namespace GameStoreUI.Areas.Admin.Models.Games
{
    public class GameViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Price { get; set; }
        public string Genre { get; set; }
        public string Developer { get; set; }
    }
}