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

        public static List<GetTypeFixedDialName> GetTypeFixedDialName()
        {
            var outInfo = new List<GetTypeFixedDialName>();

            try
            {

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetTypeFixedDialName", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new GetTypeFixedDialName
                        {
                            TypeFixedDialName = SqlHelper.CheckStringNull(dtr["TypeFixedDialName"]),
                            TypeFixedDialID = SqlHelper.CheckIntNull(dtr["TypeFixedDialID"]),

                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static List<GetLocation> GetLocation()
        {
            var outInfo = new List<GetLocation>();

            try
            {

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetLocation", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new GetLocation
                        {
                            LocationName = SqlHelper.CheckStringNull(dtr["LocationName"]),
                            LocationID = SqlHelper.CheckIntNull(dtr["LocationID"]),

                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static List<GetMenuRoot> GetMenuRoot()
        {
            var outInfo = new List<GetMenuRoot>();

            try
            {

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetMenuRootDDL", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new GetMenuRoot
                        {
                            MenuRootName = SqlHelper.CheckStringNull(dtr["MenuRootName"]),
                            MenuRootID = SqlHelper.CheckIntNull(dtr["MenuRootID"]),

                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }
        public static List<GetGroups> GetGroups()
        {
            var outInfo = new List<GetGroups>();

            try
            {

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetGroups", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                    select new GetGroups
                        {
                            GroupsID = SqlHelper.CheckIntNull(dtr["GroupsID"]),
                            GroupsName = SqlHelper.CheckStringNull(dtr["GroupsName"]),

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