using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Areas.CallUser.Models
{
    public class UserDAL
    {
        public static OutInfoUser GetMenuRoot(InInfoUser inInfo)
        {
            var outInfo = new OutInfoUser();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@UserName",SqlHelper.CheckStringNull(inInfo.UserName))
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetInfoAccount", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dtr in dt.Rows)
                    {
                        outInfo.StaffID = SqlHelper.CheckIntNull(dtr["StaffID"]);
                        outInfo.Status = SqlHelper.CheckIntNull(dtr["Status"]);
                        outInfo.StaffName = SqlHelper.CheckStringNull(dtr["StaffName"]);
                        outInfo.Email = SqlHelper.CheckStringNull(dtr["Email"]);
                        outInfo.PhoneNumber = SqlHelper.CheckStringNull(dtr["PhoneNumber"]);
                        outInfo.Birthdays = SqlHelper.CheckStringNull(dtr["Birthdays"]);
                        outInfo.Address = SqlHelper.CheckStringNull(dtr["Address"]);
                        outInfo.Passport = SqlHelper.CheckStringNull(dtr["Passport"]);
                        outInfo.DayIn = SqlHelper.CheckStringNull(dtr["DayIn"]);
                        outInfo.RoleName = SqlHelper.CheckStringNull(dtr["RoleName"]);
                        outInfo.UserName = SqlHelper.CheckStringNull(dtr["UserName"]);
                        outInfo.IPPhone = SqlHelper.CheckStringNull(dtr["IPPhone"]);
                        outInfo.BranchName = SqlHelper.CheckStringNull(dtr["BranchName"]);
                        outInfo.DepartmentName = SqlHelper.CheckStringNull(dtr["DepartmentName"]);
                        outInfo.CompanyName = SqlHelper.CheckStringNull(dtr["CompanyName"]);
                    }


                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }
    }
}