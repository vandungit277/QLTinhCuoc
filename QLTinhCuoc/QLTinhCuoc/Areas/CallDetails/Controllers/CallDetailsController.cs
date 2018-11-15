using QLTinhCuoc.Areas.CallDetails.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QL_Model;

namespace QLTinhCuoc.Areas.CallDetails.Controllers
{
    public class CallDetailsController : Controller
    {
        //
        // GET: /CallDetails/CallDetails/
        public ActionResult IndexDetailsRP()
        {
            return View();
        }
        public ActionResult IndexSynthesisRP()
        {
            return View();
        }
        public ActionResult IndexTopsRP()
        {
            return View();
        }
        // POST: /CallDetails/CallDetails/Call_ListSynthesisRP
        /// <summary>
        /// Lấy danh sách báo cáo tổng hợp
        /// </summary>
        /// <param name="ints"></param>
        /// <returns></returns>
        public JsonResult Call_ListSynthesisRP(IntCallDetails ints)
        {
            var output = new List<OutListCallDetails>();
            try
            {
                output = CallDetailsDAL.GetListSynthesisRP(ints);
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


        // POST: /CallDetails/CallDetails/Call_GetListDetailsRP
        /// <summary>
        /// Lấy danh sách báo cáo chi tiết
        /// </summary>
        /// <param name="ints"></param>
        /// <returns></returns>
        public JsonResult Call_GetListDetailsRP(IntCallDetails ints)
        {
            var output = new List<OutListDetailsRP>();
            try
            {
                output = CallDetailsDAL.GetListDetailsRP(ints);
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
        // POST: /CallDetails/CallDetails/Call_GetListTopsRP
        /// <summary>
        /// Lấy danh sách báo cáo chi tiết
        /// </summary>
        /// <param name="ints"></param>
        /// <returns></returns>
        public JsonResult Call_GetListTopsRP(IntTopCallDetails ints)
        {
            var output = new List<OutListDetailsRP>();
            try
            {
                output = CallDetailsDAL.GetListTopsRP(ints);
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