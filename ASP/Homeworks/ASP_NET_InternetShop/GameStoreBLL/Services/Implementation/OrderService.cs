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
        private readonly IGenericRepository<OrderStatus> orderStatusRepo;

        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<OrderStatus> orderStatusRepo)
        {
            this.orderRepo = orderRepo;
            this.orderStatusRepo = orderStatusRepo;
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
            var compeletedOrders = orderRepo.GetAll()
                                  .Where(x => x.IsDone.Equals(true));

            orderRepo.DeleteMultiple(compeletedOrders);
        }

        public void UpdateOrderStatus(int id)
        {
            var order = orderRepo.GetEntityById(id);

            var status = orderStatusRepo.GetAll()
                                        .FirstOrDefault(x => x.Name.Equals("Done"));

            order.IsDone = true;

            order.OrderStatus = status;

            orderRepo.Update(order);
        }
    }
}
