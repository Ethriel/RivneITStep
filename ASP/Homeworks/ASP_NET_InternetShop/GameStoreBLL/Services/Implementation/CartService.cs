using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreDAL.Repository.Abstraction;
using System.Linq;

namespace GameStoreBLL.Services.Implementation
{
    public class CartService : ICartService
    {
        private readonly IGenericRepository<Order> ordersRepo;
        private readonly IGenericRepository<OrderStatus> orderStatusRepo;

        public CartService(IGenericRepository<Order> ordersRepo, IGenericRepository<OrderStatus> orderStatusRepo)
        {
            this.ordersRepo = ordersRepo;
            this.orderStatusRepo = orderStatusRepo;
        }
        public void AddOrder(Order order)
        {
            ordersRepo.Create(order);
        }

        public Order FindById(int id)
        {
            return ordersRepo.GetEntityById(id);
        }

        public OrderStatus GetDefaultOrderStatus()
        {
            var status = orderStatusRepo.GetAll()
                                        .FirstOrDefault(x => x.Name.Equals("In progress"));

            return status;
        }

        public void RemoveOrder(int id)
        {
            var order = ordersRepo.GetEntityById(id);

            ordersRepo.Delete(order);
        }
    }
}
