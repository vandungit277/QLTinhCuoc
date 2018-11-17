using System.Web.Mvc;

namespace QLTinhCuoc.Areas.CallMenu
{
    public class CallMenuAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CallMenu";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CallMenu_default",
                "CallMenu/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}