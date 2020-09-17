using AutoMapper;
using GameStoreBLL.Services.Abstraction;
using GameStoreDAL.Entities;
using GameStoreUI.Areas.Admin.Models.Orders;
using System.Collections.Generic;
using System.Web.Mvc;

namespace GameStoreUI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class OrdersController : Controller
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            this.orderService = orderService;
            this.mapper = mapper;
        }

        public ActionResult ListOrders()
        {
            var orders = orderService.GetAllOrders();
            var models = mapper.Map<IEnumerable<Order>, IEnumerable<OrderViewModel>>(orders);

            return View(models);
        }

        public ActionResult CompleteOrder(int id)
        {
            orderService.UpdateOrderStatus(id);

            return ReturnToOrdersList();
        }

        public ActionResult RemoveCompleted()
        {
            orderService.RemoveCompletedOrders();

            return ReturnToOrdersList();
        }

        private ActionResult ReturnToOrdersList()
        {
            return RedirectToAction(nameof(ListOrders), "Orders", new { area = "Admin" });
        }
    }
}