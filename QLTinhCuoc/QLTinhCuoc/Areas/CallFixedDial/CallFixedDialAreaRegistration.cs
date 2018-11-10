using System.Web.Mvc;

namespace QLTinhCuoc.Areas.CallFixedDial
{
    public class CallFixedDialAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CallFixedDial";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CallFixedDial_default",
                "CallFixedDial/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}