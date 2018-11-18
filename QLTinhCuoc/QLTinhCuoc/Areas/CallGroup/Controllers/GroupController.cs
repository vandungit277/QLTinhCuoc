﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using QLTinhCuoc.Areas.CallGroup.Models;
using QLTinhCuoc.Models;
using QL_Model;

namespace QLTinhCuoc.Areas.CallGroup.Controllers
{
    public class GroupController : Controller
    {
        //
        // GET: /CallGroup/Group/NewGroup
        public ActionResult NewGroup()
        {
            return View();
        }

        //
        // GET: /CallGroup/Group/ListGroup
        public ActionResult ListGroup()
        {
            return View();
        }
        // POST: /CallGroup/Group/Call_NewGroup
        /// <summary>
        /// Thêm mới Group
        /// </summary>
        /// <param name="intNewGroup"></param>
        /// <returns></returns>
        public JsonResult Call_NewGroup(IntNewGroup intNewGroup)
        {
            var output = new Result();
            try
            {
                var session = (LoginOut)Session["SessionLogin"];
                intNewGroup.CreateBy = session.UserName;
                output = GroupDAL.NewGroup(intNewGroup);
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }
            finally
            {
                WriteLog.writeLogResponse(JsonConvert.SerializeObject(output, Formatting.Indented)
                                          + "\r\n" + JsonConvert.SerializeObject(intNewGroup));
            }

            return Json(output, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// Danh sách Group
        /// </summary>
        /// <returns></returns>
        // POST: /CallGroup/Group/Call_GetListGroup
        public JsonResult Call_GetListGroup()
        {
            var output = new List<OutListGroup>();
            try
            {
                output = GroupDAL.GetListGroup();
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