using System.Web.Mvc;

namespace QLTinhCuoc.Areas.PhoneInside
{
    public class PhoneInsideAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "PhoneInside";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "PhoneInside_default",
                "PhoneInside/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}