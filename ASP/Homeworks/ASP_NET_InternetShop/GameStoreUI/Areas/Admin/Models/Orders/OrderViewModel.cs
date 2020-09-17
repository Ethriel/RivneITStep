using System.ComponentModel;

namespace GameStoreUI.Areas.Admin.Models.Orders
{
    public class OrderViewModel
    {
        public int Id { get; set; }

        [DisplayName("Order status")]
        public string OrderStatus { get; set; }

        [DisplayName("User")]
        public string GameStoreUser { get; set; }

        [DisplayName("Order date")]
        public string OrderDate { get; set; }

        [DisplayName("Completed")]
        public string IsDone { get; set; }

        [DisplayName("Total price")]
        public double TotalPrice { get; set; }
    }
}