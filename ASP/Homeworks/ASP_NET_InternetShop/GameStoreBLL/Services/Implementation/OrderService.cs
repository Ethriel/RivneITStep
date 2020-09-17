using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreDAL.Repository.Abstraction;
using System.Collections.Generic;
using System.Linq;

namespace GameStoreBLL.Services.Implementation
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> orderRepo;

        public OrderService(IGenericRepository<Order> orderRepo)
        {
            this.orderRepo = orderRepo;
        }
        public Order FindOrderById(int id)
        {
            return orderRepo.GetEntityById(id);
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return orderRepo.GetAll();
        }

        public void RemoveCompletedOrders()
        {
            var orders = orderRepo.GetAll()
                                  .Where(x => x.IsDone.Equals(true));

            foreach (var order in orders)
            {
                orderRepo.Delete(order);
            }
        }

        public void UpdateOrderStatus(int id)
        {
            var order = orderRepo.GetEntityById(id);

            order.IsDone = true;

            orderRepo.Update(order);
        }
    }
}
