using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StoreCS.Entity
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<News> News { get; set; }
        public Category()
        {
            News = new HashSet<News>();
        }
    }
}