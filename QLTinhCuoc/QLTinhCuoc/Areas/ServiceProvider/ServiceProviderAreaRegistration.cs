﻿using System.Web.Mvc;

namespace QLTinhCuoc.Areas.ServiceProvider
{
    public class ServiceProviderAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "ServiceProvider";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "ServiceProvider_default",
                "ServiceProvider/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}