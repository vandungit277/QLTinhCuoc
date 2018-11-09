using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Areas.ServiceProvider.Models
{
    public class ServiceProviderDAL
    {
        public static List<OutGetServiceCharge> InfoIPPhoneInside()
        {
            var outInfo = new List<OutGetServiceCharge>();

            try
            {


                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetServiceCharge", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new OutGetServiceCharge
                        {
                            ServiceProviderID = SqlHelper.CheckIntNull(dtr["ServiceProviderID"]),
                            TypeCallID = SqlHelper.CheckIntNull(dtr["TypeCallID"]),
                            NameServiceProvider = SqlHelper.CheckStringNull(dtr["NameServiceProvider"]),
                            block1 = SqlHelper.CheckIntNull(dtr["block1"]),
                            price1 = SqlHelper.CheckFloatNull(dtr["price1"]),
                            block2 = SqlHelper.CheckIntNull(dtr["block2"]),
                            price2 = SqlHelper.CheckFloatNull(dtr["price2"]),
                            NameTypeCall = SqlHelper.CheckStringNull(dtr["NameTypeCall"])
                        });
                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outInfo;
        }

        public static OutNNewServiceCharge NewServiceCharge(IntNNewServiceCharge inp)
        {
            var outNewIpPhone = new OutNNewServiceCharge();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@TypeCallID",inp.TypeCallID),
                    new SqlParameter("@ServiceProviderID",inp.ServiceProviderID),
                    new SqlParameter("@block1",inp.block1),
                    new SqlParameter("@price1",inp.price1),
                    new SqlParameter("@block2",inp.block2),
                    new SqlParameter("@price2",inp.price2),
                    new SqlParameter("@Status",inp.Status),
                    new SqlParameter("@UpdateBy",inp.UpdateBy)
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConWrite(), CommandType.StoredProcedure, "dbo.Call_NewServiceCharge", pars).Tables[0];

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

        public static List<OutGetTypeCall> GetTypeCall()
        {
            var outInfo = new List<OutGetTypeCall>();

            try
            {


                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_GetTypeCall", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new OutGetTypeCall
                        {
                            NameTypeCall = SqlHelper.CheckStringNull(dtr["NameTypeCall"]),
                            TypeCallID = SqlHelper.CheckIntNull(dtr["TypeCallID"]),
                           
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