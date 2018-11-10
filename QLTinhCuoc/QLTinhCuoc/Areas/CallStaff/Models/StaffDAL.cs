using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;


namespace QLTinhCuoc.Areas.CallStaff.Models
{
    public class StaffDAL
    {
        public static Result NewStaff(IntNewStaff inp)
        {
            var outNewStaff = new Result();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@DepartmentID",inp.DepartmentID),
                    new SqlParameter("@SexID",inp.SexID),
                    new SqlParameter("@RoleID",inp.RoleID),
                    new SqlParameter("@StaffName",inp.StaffName),
                    new SqlParameter("@Birthdays",Function.FormatDateSQL(inp.Birthdays)),
                    new SqlParameter("@Address",inp.Address),
                    new SqlParameter("@Status",inp.Status),
                    new SqlParameter("@DayIn",Function.FormatDateSQL(inp.DayIn)),
                    new SqlParameter("@Passport",inp.Passport),
                    new SqlParameter("@UserName",inp.UserName),
                    new SqlParameter("@Password",Function.Sha256encrypt(inp.Password)),
                    new SqlParameter("@Email",inp.Email),
                    new SqlParameter("@PhoneNumber",inp.PhoneNumber),
                    new SqlParameter("@CreateBy",inp.CreateBy)
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConWrite(), CommandType.StoredProcedure, "dbo.Call_NewStaff", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dtr in dt.Rows)
                    {
                        outNewStaff.Code = SqlHelper.CheckIntNull(dtr["Code"]);
                        outNewStaff.Desc = SqlHelper.CheckStringNull(dtr["Desc"]);

                    }


                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outNewStaff;
        }
    }
}