using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Areas.CallDetails.Models
{
    public class CallDetailsDAL
    {
        public static List<OutListCallDetails> GetListSynthesisRP(IntCallDetails ints)
        {
            var outInfo = new List<OutListCallDetails>();

            try
            {
                SqlParameter[] pars =
                {   new SqlParameter("@Search",ints.Search) ,          
                    new SqlParameter("@UserName",ints.UserName) ,
                    new SqlParameter("@CompanyID",ints.CompanyID) ,                
                    new SqlParameter("@BranchID",ints.BranchID)  ,
                    new SqlParameter("@DepartmentID",ints.DepartmentID) ,
                    new SqlParameter("@FromDate",Function.FormatDateSQL(ints.FromDate)) ,
                    new SqlParameter("@ToDate",Function.FormatDateSQL(ints.ToDate))                
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_SynthesisRP", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                      select new OutListCallDetails
                        {
                            UserName = SqlHelper.CheckStringNull(dtr["UserName"]),             
                            Total = SqlHelper.CheckFloatNull(dtr["Total"]),
                            TotalTimeCalled = SqlHelper.CheckStringNull(dtr["TotalTimeCalled"]),
                            BranchName = SqlHelper.CheckStringNull(dtr["BranchName"]),
                            DepartmentName = SqlHelper.CheckStringNull(dtr["DepartmentName"]),
                            CompanyName = SqlHelper.CheckStringNull(dtr["CompanyName"])
                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static List<OutListDetailsRP> GetListDetailsRP(IntCallDetails ints)
        {
            var outInfo = new List<OutListDetailsRP>();

            try
            {
                SqlParameter[] pars =
                {   new SqlParameter("@Search",ints.Search) ,          
                    new SqlParameter("@UserName",ints.UserName) ,
                    new SqlParameter("@CompanyID",ints.CompanyID) ,                
                    new SqlParameter("@BranchID",ints.BranchID)  ,
                    new SqlParameter("@DepartmentID",ints.DepartmentID) ,
                    new SqlParameter("@FromDate",Function.FormatDateSQL(ints.FromDate)) ,
                    new SqlParameter("@ToDate",Function.FormatDateSQL(ints.ToDate))                
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_DetailsRP", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                      select new OutListDetailsRP
                        {
                            UserName = SqlHelper.CheckStringNull(dtr["UserName"]),
                            From = SqlHelper.CheckStringNull(dtr["From"]),
                            To = SqlHelper.CheckStringNull(dtr["To"]),
                            Total = SqlHelper.CheckFloatNull(dtr["Total"]),
                            TotalTimeCalled = SqlHelper.CheckStringNull(dtr["TotalTimeCalled"]),
                            LocationNameFrom = SqlHelper.CheckStringNull(dtr["LocationNameFrom"]),
                            LocationNameTo = SqlHelper.CheckStringNull(dtr["LocationNameTo"]),
                            TypeFixedDialName = SqlHelper.CheckStringNull(dtr["TypeFixedDialName"]),
                            BranchName = SqlHelper.CheckStringNull(dtr["BranchName"]),
                            DepartmentName = SqlHelper.CheckStringNull(dtr["DepartmentName"]),
                            CompanyName = SqlHelper.CheckStringNull(dtr["CompanyName"])
                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static List<OutListDetailsRP> GetListTopsRP(IntTopCallDetails ints)
        {
            var outInfo = new List<OutListDetailsRP>();

            try
            {
                SqlParameter[] pars =
                {   new SqlParameter("@Search",ints.Search) ,          
                    new SqlParameter("@Top",ints.Top) ,            
                    new SqlParameter("@FromDate",Function.FormatDateSQL(ints.FromDate)) ,
                    new SqlParameter("@ToDate",Function.FormatDateSQL(ints.ToDate))                
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_TopsRP", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                        select new OutListDetailsRP
                        {
                            UserName = SqlHelper.CheckStringNull(dtr["UserName"]),
                            From = SqlHelper.CheckStringNull(dtr["From"]),
                            To = SqlHelper.CheckStringNull(dtr["To"]),
                            Total = SqlHelper.CheckFloatNull(dtr["Total"]),
                            TotalTimeCalled = SqlHelper.CheckStringNull(dtr["TotalTimeCalled"]),
                            LocationNameFrom = SqlHelper.CheckStringNull(dtr["LocationNameFrom"]),
                            LocationNameTo = SqlHelper.CheckStringNull(dtr["LocationNameTo"]),
                            TypeFixedDialName = SqlHelper.CheckStringNull(dtr["TypeFixedDialName"]),
                            BranchName = SqlHelper.CheckStringNull(dtr["BranchName"]),
                            DepartmentName = SqlHelper.CheckStringNull(dtr["DepartmentName"]),
                            CompanyName = SqlHelper.CheckStringNull(dtr["CompanyName"])
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