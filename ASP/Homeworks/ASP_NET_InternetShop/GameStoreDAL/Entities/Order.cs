using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GameStoreDAL.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public virtual OrderStatus OrderStatus { get; set; }
        public virtual ICollection<Game> Games { get; set; }
        public virtual GameStoreUser GameStoreUser { get; set; }
        public string OrderDate { get; set; }
        public bool IsDone { get; set; }
        public double TotalPrice { get; set; }
        public Order()
        {
            Games = new List<Game>();
        }
    }
}
