using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.CallStaff.Models;
using QLTinhCuoc.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.CallStaff.Controllers
{
    public class StaffController : Controller
    {
        //
        // GET: /CallStaff/Staff/
        public ActionResult Index()
        {
            return View();
        }
        // POST: /CallStaff/Staff/Call_NewStaff
        /// <summary>
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="intNewStaff"></param>
        /// <returns></returns>
        public JsonResult Call_NewStaff(IntNewStaff intNewStaff)
        {
            var output = new Result();
            try
            {
                var session = (LoginOut)Session["SessionLogin"];
                intNewStaff.CreateBy = session.UserName;
                output = StaffDAL.NewStaff(intNewStaff);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(intNewStaff));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }
	}
}