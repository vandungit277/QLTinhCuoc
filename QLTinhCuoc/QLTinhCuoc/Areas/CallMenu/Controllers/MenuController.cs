using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.CallMenu.Models;
using QLTinhCuoc.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.CallMenu.Controllers
{
    public class MenuController : Controller
    {
        //
        // GET: /CallMenu/Menu/MenuUser
        public ActionResult MenuUser()
        {
            return View();
        }
        //
        // GET: /CallMenu/Menu/MenuGroup
        public ActionResult MenuGroup()
        {
            return View();
        }
        // POST: /CallMenu/Menu/Call_ListGetMenuUser
        /// <summary>
        /// Lấy danh sách Menu User
        /// </summary>
        /// <param name="ints"></param>
        /// <returns></returns>
        public JsonResult Call_ListGetMenuUser(IntMenuUser ints)
        {
            var output = new List<OutMenuUser>();
            try
            {
                output = MenuDAL.GetListGetMenuUser(ints);
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
        // POST: /CallMenu/Menu/Call_IUMenuUser
        /// <summary>
        /// Cấp/cắt quyền User
        /// </summary>
        /// <param name="IUMenuUser"></param>
        /// <returns></returns>
        public JsonResult Call_IUMenuUser(IUMenuUser IUMenuUser)
        {
            var output = new Result();
            try
            {
                var session = (LoginOut)Session["SessionLogin"];
                IUMenuUser.UpdateBy = session.UserName;
                output = MenuDAL.IUMenuUser(IUMenuUser);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(IUMenuUser));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }

        // POST: /CallMenu/Menu/Call_ListGetMenuGroup
        /// <summary>
        /// Lấy danh sách Menu Groups
        /// </summary>
        /// <param name="ints"></param>
        /// <returns></returns>
        public JsonResult Call_ListGetMenuGroup(IntMenuGroup ints)
        {
            var output = new List<OutMenuGroup>();
            try
            {
                output = MenuDAL.GetListGetMenuGroup(ints);
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
        // POST: /CallMenu/Menu/Call_IUGroupsMenu
        /// <summary>
        /// Cấp/cắt quyền Groups
        /// </summary>
        /// <param name="IUGroupsMenu"></param>
        /// <returns></returns>
        public JsonResult Call_IUGroupsMenu(IUGroupsMenu IUGroupsMenu)
        {
            var output = new Result();
            try
            {
                var session = (LoginOut)Session["SessionLogin"];
                IUGroupsMenu.UpdateBy = session.UserName;
                output = MenuDAL.IUGroupsMenu(IUGroupsMenu);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(IUGroupsMenu));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }
	}
}