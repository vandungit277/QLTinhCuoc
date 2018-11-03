using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Models
{
    public class LoginDAL
    {
        public static LoginOut GetMenuRoot(Login lnLogin)
        {
            var li = new LoginOut();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@UserName",SqlHelper.CheckStringNull(lnLogin.UserName)),
                    new SqlParameter("@Password", SqlHelper.CheckStringNull(lnLogin.Password))
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_Login", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dtr in dt.Rows)
                    {
                        li.Code = SqlHelper.CheckIntNull(dtr["Code"]);
                        li.Desc = SqlHelper.CheckStringNull(dtr["Desc"]);
                        break;
                    }
                           
                   
                }

                
            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return li;
        }

    }
}