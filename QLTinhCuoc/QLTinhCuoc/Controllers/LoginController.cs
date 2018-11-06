using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.Login.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/Login/
        public ActionResult Index()
        {
            return View();
          
        }

        public JsonResult CallLogin(Models.Login lniLogin)
        {
            var output = new LoginOut();
           
           
            if (string.IsNullOrEmpty(lniLogin.UserName))
            {
                output.Code = 0;
                output.Desc = "Vui lòng nhập UserName";
                return Json(output, JsonRequestBehavior.AllowGet);
            }
            if (string.IsNullOrEmpty(lniLogin.Password))
            {
                output.Code = 0;
                output.Desc = "Vui lòng nhập Password";
                return Json(output, JsonRequestBehavior.AllowGet);
            }
            try
            {
                lniLogin.Password = Function.Sha256encrypt(SqlHelper.CheckStringNull(lniLogin.Password));
                output =  LoginDAL.GetMenuRoot(lniLogin);
                output.UserName = lniLogin.UserName;
                Session["SessionLogin"] = output;
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(lniLogin));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SessionLogin()
        {
            var session = (LoginOut)Session["SessionLogin"];
            if (session == null)
            {
                Session["SessionLogin"] = new LoginOut{ Code = 0, Desc = "Đã đăng xuất",UserName = ""};
            }
            return Json(Session["SessionLogin"], JsonRequestBehavior.AllowGet);
        }

        public JsonResult KillSessionLogin()
        {

            Session["SessionLogin"] = new LoginOut { Code = 0, Desc = "Đã đăng xuất", UserName = "" };
            return Json(Session["SessionLogin"], JsonRequestBehavior.AllowGet);
        }
        public JsonResult Sha256encrypt(string password)
        {
            var output = EncryptPW.Sha256encrypt(password);
                        
            return Json(output, JsonRequestBehavior.AllowGet);
        }
       
	}
}