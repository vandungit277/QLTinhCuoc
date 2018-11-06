using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.CallUser.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.CallUser.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /CallUser/User/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ChangePassword()
        {
            return View();
        }


        public JsonResult Call_InfoAccount(InInfoUser inInfo)
        {
            var output = new OutInfoUser();
            try
            {
                output = UserDAL.GetMenuRoot(inInfo);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(inInfo));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Call_ChangePassword(InChangePassword inChangePassword)
        {
            var output = new OutChangePassword();
            try
            {
                output = UserDAL.ChangePassWord(inChangePassword);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(inChangePassword));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }
	}
}