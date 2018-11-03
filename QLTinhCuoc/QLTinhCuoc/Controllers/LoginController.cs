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
            
            try
            {
                lniLogin.Password = EncryptPW.Sha256encrypt(lniLogin.Password);
                output =  LoginDAL.GetMenuRoot(lniLogin);

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

        public JsonResult Sha256encrypt(string password)
        {
            var output = EncryptPW.Sha256encrypt(password);
                        
            return Json(output, JsonRequestBehavior.AllowGet);
        }

	}
}