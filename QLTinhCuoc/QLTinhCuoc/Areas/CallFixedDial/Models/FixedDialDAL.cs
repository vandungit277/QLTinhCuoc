using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Areas.CallFixedDial.Models
{
    public class FixedDialDAL
    {
        public static Result NewServiceCharge(IntNewFixedDial inp)
        {
            var outNewIpPhone = new Result();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@LocationID",inp.LocationID),
                    new SqlParameter("@PostalCode",inp.PostalCode),
                    new SqlParameter("@Description",inp.Description),
                    new SqlParameter("@TypeFixedDialID",inp.TypeFixedDialID),
                    new SqlParameter("@CreateBy",inp.CreateBy),
                    new SqlParameter("@Status",inp.Status)
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConWrite(), CommandType.StoredProcedure, "dbo.Call_NewFixedDial", pars).Tables[0];

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

        public static List<OutListFixedDial> GetListStaff(IntListFixedDial ints)
        {
            var outInfo = new List<OutListFixedDial>();

            try
            {
                SqlParameter[] pars =
                {   new SqlParameter("@Search",ints.Search) ,                
                    new SqlParameter("@PostalCode",ints.PostalCode) ,
                    new SqlParameter("@LocationID",ints.LocationID) ,                
                    new SqlParameter("@TypeFixedDialID",ints.TypeFixedDialID) 
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_ListFixedDial", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new OutListFixedDial
                        {
                            PostalCode = SqlHelper.CheckStringNull(dtr["PostalCode"]),
                            TypeFixedDialName = SqlHelper.CheckStringNull(dtr["TypeFixedDialName"]),
                            LocationName = SqlHelper.CheckStringNull(dtr["LocationName"]),
                            CreateBy = SqlHelper.CheckStringNull(dtr["CreateBy"]),
                            Description = SqlHelper.CheckStringNull(dtr["Description"])
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