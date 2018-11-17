using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Areas.CallMenu.Models
{
    public class MenuDAL
    {
        public static List<OutMenuUser> GetListGetMenuUser(IntMenuUser ints)
        {
            var outInfo = new List<OutMenuUser>();

            try
            {
                SqlParameter[] pars =
                {   new SqlParameter("@Search",ints.Search) ,          
                    new SqlParameter("@UserName",ints.UserName) ,
                    new SqlParameter("@MenuRootID",ints.MenuRootID)                
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetMenuUser", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                     select new OutMenuUser
                        {
                            MenuID = SqlHelper.CheckIntNull(dtr["MenuID"]),
                            MenuName = SqlHelper.CheckStringNull(dtr["MenuName"]),
                            Status = SqlHelper.CheckIntNull(dtr["Status"]),
                            UserName = ints.UserName
                        });
                }

            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static Result IUMenuUser(IUMenuUser inp)
        {
            var outMenu = new Result();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@UserName",inp.UserName),
                    new SqlParameter("@MenuID",inp.MenuID),
                    new SqlParameter("@Status",inp.Status),
                    new SqlParameter("@UpdateBy",inp.UpdateBy)
                    
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConWrite(), CommandType.StoredProcedure, "dbo.Call_IUMenuUser", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dtr in dt.Rows)
                    {
                        outMenu.Code = SqlHelper.CheckIntNull(dtr["Code"]);
                        outMenu.Desc = SqlHelper.CheckStringNull(dtr["Desc"]);

                    }


                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outMenu;
        }

        public static List<OutMenuGroup> GetListGetMenuGroup(IntMenuGroup ints)
        {
            var outInfo = new List<OutMenuGroup>();

            try
            {
                SqlParameter[] pars =
                {   new SqlParameter("@Search",ints.Search) ,          
                    new SqlParameter("@GroupsID",ints.GroupsID) ,
                    new SqlParameter("@MenuRootID",ints.MenuRootID)                
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetMenuGroups", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                       select new OutMenuGroup
                        {
                            MenuID = SqlHelper.CheckIntNull(dtr["MenuID"]),
                            MenuName = SqlHelper.CheckStringNull(dtr["MenuName"]),
                            Status = SqlHelper.CheckIntNull(dtr["Status"]),
                            GroupsID = ints.GroupsID
                        });
                }

            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }
        public static Result IUGroupsMenu(IUGroupsMenu inp)
        {
            var outMenu = new Result();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@GroupsID",inp.GroupsID),
                    new SqlParameter("@MenuID",inp.MenuID),
                    new SqlParameter("@Status",inp.Status),
                    new SqlParameter("@UpdateBy",inp.UpdateBy)
                    
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConWrite(), CommandType.StoredProcedure, "dbo.Call_IUGroupsMenu", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dtr in dt.Rows)
                    {
                        outMenu.Code = SqlHelper.CheckIntNull(dtr["Code"]);
                        outMenu.Desc = SqlHelper.CheckStringNull(dtr["Desc"]);

                    }


                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outMenu;
        }

    }
}