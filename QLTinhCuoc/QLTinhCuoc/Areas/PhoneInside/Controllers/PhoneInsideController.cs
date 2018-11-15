using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.CallUser.Models;
using QLTinhCuoc.Areas.PhoneInside.Models;
using QLTinhCuoc.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.PhoneInside.Controllers
{
    public class PhoneInsideController : Controller
    {
        //
        // GET: /PhoneInside/PhoneInside/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult InfoIPPhoneInside()
        {
            return View();
        }
        public ActionResult PhoneCompany()
        {
            return View();
        }
        public ActionResult Phonepersonal()
        {
            return View();
        }
        
        /// <summary>
        /// LẤy thông tin nhà cung cấp dịch vụ load dropdown
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetServiceProvider()
        {
            var output = new List<OutGetServiceProvider>();
            try
            {
                output = PhoneInsideDAL.GetServiceProvider();
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(""));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Thêm mới số nội bộ
        /// </summary>
        /// <param name="inp"></param>
        /// <returns></returns>
        public JsonResult Call_NewIpPhoneInside(IntNewIPPhoneInside inp)
        {
            var output = new OutNewIPPhoneInside();
            try
            {
                var session = (LoginOut)Session["SessionLogin"];
                inp.CreateBy = session.UserName;
                output = PhoneInsideDAL.NewIpPhoneInside(inp);
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
        /// <summary>
        /// Lấy thông tin số điện thoại nội bộ
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_InfoIPPhoneInside()
        {
            var output = new List<OutInfoIPPhoneInside>();
            try
            {
                output = PhoneInsideDAL.InfoIPPhoneInside();
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(""));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Lấy thông tin số điện thoại nội bộ theo chi nhánh công ty
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetIPPhoneCompany()
        {
            var output = new List<OutInfoIPPhoneInside>();
            try
            {
                var session = (LoginOut)Session["SessionLogin"];

                output = PhoneInsideDAL.GetIPPhoneCompany(session.UserName);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(""));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }

	}
}