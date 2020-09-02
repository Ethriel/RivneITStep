using System;

namespace StoreCS.Entity
{
    public class News
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Image { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public Category Category { get; set; }
    }
}