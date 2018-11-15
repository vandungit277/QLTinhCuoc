using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.CallManagement.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.CallManagement.Controllers
{
    public class ManagementController : Controller
    {
        //
        // GET: /CallManagement/Management/
        public ActionResult Index()
        {
            return View();
        }
        //nội hạt
        public ActionResult ListManagementLocal()
        {
            return View();
        }
        //Liên tỉnh
        public ActionResult ListManagementOut()
        {
            return View();
        }
        //Di động
        public ActionResult ListManagementPhone()
        {
            return View();
        }
        //Dịch vụ
        public ActionResult ListManagementService()
        {
            return View();
        }
        // POST: /CallManagement/Management/Call_ListManagement
        /// <summary>
        /// Lấy danh sách cước gọi
        /// </summary>
        /// <param name="ints"></param>
        /// <returns></returns>
        public JsonResult Call_ListManagement(IntCallManagement ints)
        {
            var output = new List<OutListCallManagement>();
            try
            {
                output = ManagementDAL.GetListManagement(ints);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(ints));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }
	}
}