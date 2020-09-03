namespace StoreCS.Models
{
    public class NewsViewModel
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Image { get; set; }
        public string Date { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public bool IsManager { get; set; }
    }
}