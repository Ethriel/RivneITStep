using GameStoreDAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreBLL.Services.Abstraction
{
    public interface IOrderService
    {
        void UpdateOrderStatus(int id);
        IEnumerable<Order> GetAllOrders();
        Order FindOrderById(int id);
        void RemoveCompletedOrders();
    }
}
