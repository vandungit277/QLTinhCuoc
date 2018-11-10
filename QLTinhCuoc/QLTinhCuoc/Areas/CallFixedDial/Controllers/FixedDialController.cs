using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.CallFixedDial.Models;
using QLTinhCuoc.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.CallFixedDial.Controllers
{
    public class FixedDialController : Controller
    {
        //
        // GET: /CallFixedDial/FixedDial/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult NewFixedDial()
        {
            return View();
        }
        // Post: /CallFixedDial/FixedDial/Call_NewFixedDial
        /// <summary>
        /// Thêm mới đầu số
        /// </summary>
        /// <param name="inp"></param>
        /// <returns></returns>
        public JsonResult Call_NewFixedDial(IntNewFixedDial inp)
        {
            var output = new Result();
            try
            {
                var session = (LoginOut)Session["SessionLogin"];
                inp.CreateBy = session.UserName;
                output = FixedDialDAL.NewServiceCharge(inp);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(inp));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }
        // Post: /CallFixedDial/FixedDial/Call_ListFixedDial
        /// <summary>
        /// Lấy danh sách đầu số
        /// </summary>
        /// <param name="inp"></param>
        /// <returns></returns>
        public JsonResult Call_ListFixedDial(IntListFixedDial ints)
        {
            var output = new List<OutListFixedDial>();
            try
            {
                output = FixedDialDAL.GetListStaff(ints);
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