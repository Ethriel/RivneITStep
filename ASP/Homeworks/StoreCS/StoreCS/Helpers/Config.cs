﻿using System.Configuration;
using System.Web;

namespace StoreCS.Helpers
{
    public static class Config
    {
        public static string DefaultConnection { get => ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString; }
        public static string LocalConnection { get => ConfigurationManager.ConnectionStrings["LocalConnection"].ConnectionString; }
        public static string NewsImagePath { get => ConfigurationManager.AppSettings["NewsImagePath"]; }
        public static string NewsImagePathOut { get => ConfigurationManager.AppSettings["NewsImagePathOut"]; }

        public static string GetAbsoluteUri(HttpRequestBase request)
        {
            return request.Url.AbsoluteUri;
        }
    }
}