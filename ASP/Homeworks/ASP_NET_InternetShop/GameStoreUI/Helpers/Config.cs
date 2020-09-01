using System.Configuration;

namespace GameStoreUI.Helpers
{
    public static class Config
    {
        public static string GamesImagesPath { get => ConfigurationManager.AppSettings["GamesImagesPath"]; }
        public static string GamesImagesOut { get => ConfigurationManager.AppSettings["GamesImagesOut"]; }
        public static string Domain { get => ConfigurationManager.AppSettings["Domain"]; }
    }
}