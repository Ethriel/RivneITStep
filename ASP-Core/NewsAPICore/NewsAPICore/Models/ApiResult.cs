using System.Text.Json.Serialization;

namespace NewsAPICore.Models
{
    public enum ApiStatus
    {
        Ok,
        NotFound,
        BadRequest,
        ApplicationError
    }

    public class ApiResult
    {
        [JsonIgnore]
        public ApiStatus Status { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public static ApiResult CreateResult(ApiStatus status, string message = null, object data = null)
        {
            return new ApiResult
            {
                Status = status,
                Message = message,
                Data = data
            };
        }
    }
}
