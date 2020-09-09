using System.Configuration;
using System.Web;

namespace GameStoreUI.Helpers
{
    public static class Config
    {
        public static string GamesImagesPath { get => ConfigurationManager.AppSettings["GamesImagesPath"]; }
        public static string GamesImagesOut { get => ConfigurationManager.AppSettings["GamesImagesOut"]; }

        public static string GetUri(HttpRequest request)
        {
            var authority = request.Url.Authority;
            var uri = $"https://{authority}";
            return uri;
        }
    }
}