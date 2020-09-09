using Microsoft.AspNetCore.Mvc;
using NewsAPICore.Models;

namespace NewsAPICore.Extensions
{
    public static class ControllerExtensions
    {
        public static IActionResult GetActionResult(this Controller controller, ApiResult result)
        {
            switch (result.Status)
            {
                case ApiStatus.Ok:
                    return controller.Ok(result);
                case ApiStatus.NotFound:
                    return controller.NotFound(result);
                case ApiStatus.BadRequest:
                case ApiStatus.ApplicationError:
                    return controller.BadRequest(result);
                default:
                    return controller.BadRequest(result);
            }
        }
    }
}
