using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GameStoreDAL.Entities
{
    public class OrderStatus
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public OrderStatus()
        {
            Orders = new HashSet<Order>();
        }
    }
}
