using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using QL_Model;

namespace QLTinhCuoc.Areas.CallDropDown.Models
{
    public class DropDownDAL
    {
        public static List<OutGetCompany> GetCompany()
        {
            var outInfo = new List<OutGetCompany>();

            try
            {

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetCompany", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                        select new OutGetCompany
                        {
                            CompanyName = SqlHelper.CheckStringNull(dtr["CompanyName"]),
                            CompanyID = SqlHelper.CheckIntNull(dtr["CompanyID"]),

                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static List<OutGetBrach> GetBrach(int companyId)
        {
            var outInfo = new List<OutGetBrach>();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@CompanyID",companyId)
                };
                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetBrach", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new OutGetBrach
                        {
                            BranchName = SqlHelper.CheckStringNull(dtr["BranchName"]),
                            BranchID = SqlHelper.CheckIntNull(dtr["BranchID"]),

                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static List<OutGetDepartment> GetDepartment(int branchId)
        {
            var outInfo = new List<OutGetDepartment>();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@BranchID",branchId)
                };
                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetDepartment", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                    select new OutGetDepartment
                        {
                            DepartmentName = SqlHelper.CheckStringNull(dtr["DepartmentName"]),
                            DepartmentID = SqlHelper.CheckIntNull(dtr["DepartmentID"]),

                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static List<OutGetRole> GetRole()
        {
            var outInfo = new List<OutGetRole>();

            try
            {

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetRole", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                   select new OutGetRole
                        {
                            RoleName = SqlHelper.CheckStringNull(dtr["RoleName"]),
                            RoleID = SqlHelper.CheckIntNull(dtr["RoleID"]),

                        });
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