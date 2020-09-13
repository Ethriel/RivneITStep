using GameStoreDAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreBLL.Services.Abstraction
{
    public interface ICartService
    {
        Order FindById(int id);
        void AddOrder(Order order);
        void RemoveOrder(int id);
        OrderStatus GetDefaultOrderStatus();
    }
}
