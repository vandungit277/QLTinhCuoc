using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Areas.CallManagement.Models
{
    public class ManagementDAL
    {
        public static List<OutListCallManagement> GetListManagement(IntCallManagement ints)
        {
            var outInfo = new List<OutListCallManagement>();

            try
            {
                SqlParameter[] pars =
                {   new SqlParameter("@Search",ints.Search) ,                
                    new SqlParameter("@FromDate",Function.FormatDateSQL(ints.FromDate)) ,
                    new SqlParameter("@ToDate",Function.FormatDateSQL(ints.ToDate))                
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_Management", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new OutListCallManagement
                        {
                            UserName = SqlHelper.CheckStringNull(dtr["UserName"]),
                            From = SqlHelper.CheckStringNull(dtr["From"]),
                            To = SqlHelper.CheckStringNull(dtr["To"]),
                            Total = SqlHelper.CheckFloatNull(dtr["Total"]),
                            TotalTimeCalled = SqlHelper.CheckStringNull(dtr["TotalTimeCalled"]),
                            LocationNameFrom = SqlHelper.CheckStringNull(dtr["LocationNameFrom"]),
                            LocationNameTo = SqlHelper.CheckStringNull(dtr["LocationNameTo"]),
                            TypeFixedDialName = SqlHelper.CheckStringNull(dtr["TypeFixedDialName"])                         
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