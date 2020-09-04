using System.Configuration;
using System.Web;

namespace StoreCS.Helpers
{
    public static class Config
    {
        public static string DefaultConnection { get => ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString; }
        public static string LocalConnection { get => ConfigurationManager.ConnectionStrings["LocalConnection"].ConnectionString; }
        public static string NewsImagePath { get => ConfigurationManager.AppSettings["NewsImagePath"]; }
        public static string NewsImagePathOut { get => ConfigurationManager.AppSettings["NewsImagePathOut"]; }
        public static string UsersAvatarsPath { get => ConfigurationManager.AppSettings["UsersAvatarsPath"]; }
        public static string UsersAvatarsPathOut { get => ConfigurationManager.AppSettings["UsersAvatarsPathOut"]; }
        public static string GetAbsoluteUri(HttpRequestBase request)
        {
            var authority = request.Url.Authority;
            var uri = $"https://{authority}";
            return uri;
        }
    }
}