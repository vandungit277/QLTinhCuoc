using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Areas.PhoneInside.Models
{
    public class PhoneInsideDAL
    {
        public static List<OutGetServiceProvider> GetServiceProvider()
        {
            var outInfo = new List<OutGetServiceProvider>();

            try
            {


                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetServiceProvider", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                        select new OutGetServiceProvider
                        {
                            ServiceProviderID = SqlHelper.CheckIntNull(dtr["ServiceProviderID"]),
                            NameServiceProvider = SqlHelper.CheckStringNull(dtr["NameServiceProvider"])
                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static OutNewIPPhoneInside NewIpPhoneInside(IntNewIPPhoneInside inp)
        {
            var outNewIpPhone = new OutNewIPPhoneInside();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@UserName",inp.UserName),
                    new SqlParameter("@ServiceProviderID",inp.ServiceProviderID),
                    new SqlParameter("@IPPhone",inp.IPPhone),
                    new SqlParameter("@Status",inp.Status),
                    new SqlParameter("@Description",inp.Description),
                    new SqlParameter("@CreateBy",inp.CreateBy)
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConWrite(), CommandType.StoredProcedure, "dbo.Call_NewIPPhoneInside", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dtr in dt.Rows)
                    {
                        outNewIpPhone.Code = SqlHelper.CheckIntNull(dtr["Code"]);
                        outNewIpPhone.Desc = SqlHelper.CheckStringNull(dtr["Desc"]);

                    }


                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outNewIpPhone;
        }


        public static List<OutInfoIPPhoneInside> InfoIPPhoneInside()
        {
            var outInfo = new List<OutInfoIPPhoneInside>();

            try
            {


                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_InfoIPPhoneInside", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new OutInfoIPPhoneInside
                        {
                            StaffName = SqlHelper.CheckStringNull(dtr["StaffName"]),
                            UserName = SqlHelper.CheckStringNull(dtr["UserName"]),
                            Email = SqlHelper.CheckStringNull(dtr["Email"]),
                            CompanyName = SqlHelper.CheckStringNull(dtr["CompanyName"]),
                            BranchName = SqlHelper.CheckStringNull(dtr["BranchName"]),
                            DepartmentName = SqlHelper.CheckStringNull(dtr["DepartmentName"]),
                            IPPhone = SqlHelper.CheckStringNull(dtr["IPPhone"]),
                            NameServiceProvider = SqlHelper.CheckStringNull(dtr["NameServiceProvider"])
                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }



        public static List<OutInfoIPPhoneInside> GetIPPhoneCompany(string UserName)
        {
            var outInfo = new List<OutInfoIPPhoneInside>();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@UserName",UserName)                 
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetIPPhoneCompany", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                        select new OutInfoIPPhoneInside
                        {
                            StaffName = SqlHelper.CheckStringNull(dtr["StaffName"]),
                            UserName = SqlHelper.CheckStringNull(dtr["UserName"]),
                            Email = SqlHelper.CheckStringNull(dtr["Email"]),
                            CompanyName = SqlHelper.CheckStringNull(dtr["CompanyName"]),
                            BranchName = SqlHelper.CheckStringNull(dtr["BranchName"]),
                            DepartmentName = SqlHelper.CheckStringNull(dtr["DepartmentName"]),
                            IPPhone = SqlHelper.CheckStringNull(dtr["IPPhone"]),
                            NameServiceProvider = SqlHelper.CheckStringNull(dtr["NameServiceProvider"])
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