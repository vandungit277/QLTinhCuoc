using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using QL_Model;

namespace QLTinhCuoc.Models
{
    public class HomeDAL
    {
        public static List<Menuroot> GetMenuRoot(string username)
        {
            var lst = new List<Menuroot>();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@UserName", username)
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetMenuRoot", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    lst.AddRange(from DataRow dtr in dt.Rows
                        select new Menuroot
                        {
                            MenuRootID = SqlHelper.CheckIntNull(dtr["MenuRootID"]),
                            MenuRootName = SqlHelper.CheckStringNull(dtr["MenuRootName"])
                        });
                }

                for (int i = 0; i < lst.Count; i++)
                {
                    SqlParameter[] pars2 =
                    {
                        new SqlParameter("@UserName", username),
                        new SqlParameter("@MenuRootID", lst[i].MenuRootID)
                    };
                    var dt2 = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetMenu", pars2).Tables[0];

                    if (dt2.Rows.Count > 0)
                    {


                        lst[i].Data.AddRange(from DataRow dtr in dt2.Rows
                            select new Menu
                            {
                                MenuID = SqlHelper.CheckIntNull(dtr["MenuID"]),
                                MenuName = SqlHelper.CheckStringNull(dtr["MenuName"]),
                                Description = SqlHelper.CheckStringNull(dtr["Description"]),
                                URL = SqlHelper.CheckStringNull(dtr["URL"])
                            });
                    }
                }
               
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return lst;
        }
    }
}