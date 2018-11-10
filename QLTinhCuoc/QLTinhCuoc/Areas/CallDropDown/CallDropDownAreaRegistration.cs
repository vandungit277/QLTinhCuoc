using System.Web.Mvc;

namespace QLTinhCuoc.Areas.CallDropDown
{
    public class CallDropDownAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CallDropDown";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CallDropDown_default",
                "CallDropDown/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}