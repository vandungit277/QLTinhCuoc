using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.CallDropDown.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.CallDropDown.Controllers
{
    public class DropDownController : Controller
    {
        //
        // GET: /CallDropDown/DropDown/Call_GetCompany
        /// <summary>
        /// Lấy thông tin công ty dropdown
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetCompany()
        {
            var output = new List<OutGetCompany>();
            try
            {
                output = DropDownDAL.GetCompany();
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

        // GET: /CallDropDown/DropDown/Call_GetBrach
        /// <summary>
        /// Lấy thông tin chi nhánh dropdown
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetBrach(int companyId)
        {
            var output = new List<OutGetBrach>();
            try
            {
                output = DropDownDAL.GetBrach(companyId);
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
        // GET: /CallDropDown/DropDown/Call_GetDepartment
        /// <summary>
        /// Lấy thông tin phòng ban dropdown
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetDepartment(int branchId)
        {
            var output = new List<OutGetDepartment>();
            try
            {
                output = DropDownDAL.GetDepartment(branchId);
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

        // GET: /CallDropDown/DropDown/Call_GetRole
        /// <summary>
        /// Lấy thông tin chức vụ
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetRole()
        {
            var output = new List<OutGetRole>();
            try
            {
                output = DropDownDAL.GetRole();
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

        // GET: /CallDropDown/DropDown/Call_GetTypeFixedDialName
        /// <summary>
        /// Lấy thông tin loại đầu số dropdown
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetTypeFixedDialName()
        {
            var output = new List<GetTypeFixedDialName>();
            try
            {
                output = DropDownDAL.GetTypeFixedDialName();
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
        // GET: /CallDropDown/DropDown/Call_GetLocation
        /// <summary>
        /// Lấy thông tin loại Tỉnh/TP
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetLocation()
        {
            var output = new List<GetLocation>();
            try
            {
                output = DropDownDAL.GetLocation();
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

        // GET: /CallDropDown/DropDown/Call_GetMenuRoot
        /// <summary>
        /// Lấy thông tin Menu chính dropdown
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetMenuRoot()
        {
            var output = new List<GetMenuRoot>();
            try
            {
                output = DropDownDAL.GetMenuRoot();
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

        // GET: /CallDropDown/DropDown/Call_GetGroups
        /// <summary>
        /// Lấy danh sách Groups dropdown
        /// </summary>
        /// <returns></returns>
        public JsonResult Call_GetGroups()
        {
            var output = new List<GetGroups>();
            try
            {
                output = DropDownDAL.GetGroups();
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