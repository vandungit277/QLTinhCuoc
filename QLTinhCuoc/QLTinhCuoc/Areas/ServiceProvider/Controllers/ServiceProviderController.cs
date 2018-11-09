using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.ServiceProvider.Models;
using QLTinhCuoc.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.ServiceProvider.Controllers
{
    public class ServiceProviderController : Controller
    {
        //
        // GET: /ServiceProvider/ServiceProvider/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult NewServiceCharge()
        {
            return View();
        }
        /// <summary>
        /// Lấy danh sách nhà cung câp - giá cước
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetServiceCharge()
        {
            var output = new List<OutGetServiceCharge>();
            try
            {
                output = ServiceProviderDAL.InfoIPPhoneInside();
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
        /// Thêm mới giá cước - nhà cung cấp
        /// </summary>
        /// <param name="inp"></param>
        /// <returns></returns>
        public JsonResult Call_NewServiceCharge(IntNNewServiceCharge inp)
        {
            var output = new OutNNewServiceCharge();
            try
            {
                var session = (LoginOut)Session["SessionLogin"];
                inp.UpdateBy = session.UserName;
                output = ServiceProviderDAL.NewServiceCharge(inp);
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
        /// Lấy thông tin Loại dịch vụ dropdown
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetTypeCall()
        {
            var output = new List<OutGetTypeCall>();
            try
            {
                output = ServiceProviderDAL.GetTypeCall();
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