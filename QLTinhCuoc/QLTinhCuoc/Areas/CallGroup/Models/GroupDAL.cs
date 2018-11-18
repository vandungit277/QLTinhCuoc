using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using QL_Model;

namespace QLTinhCuoc.Areas.CallGroup.Models
{
    public class GroupDAL
    {
        public static Result NewGroup(IntNewGroup inp)
        {
            var outNewGroup = new Result();

            try
            {
                SqlParameter[] pars =
                {
                    new SqlParameter("@GroupsName",inp.GroupsName),
                    new SqlParameter("@Description",inp.Description),
                    new SqlParameter("@Status",inp.Status),
                    new SqlParameter("@CreateBy",inp.CreateBy)
                };

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConWrite(), CommandType.StoredProcedure, "dbo.Call_NewGroups", pars).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dtr in dt.Rows)
                    {
                        outNewGroup.Code = SqlHelper.CheckIntNull(dtr["Code"]);
                        outNewGroup.Desc = SqlHelper.CheckStringNull(dtr["Desc"]);

                    }


                }


            }
            catch (Exception ex)
            {
                WriteLog.writeLogError(ex);
            }

            return outNewGroup;
        }

        public static List<OutListGroup> GetListGroup()
        {
            var outInfo = new List<OutListGroup>();

            try
            {

                var dt = SqlHelper.ExecuteDataset(ConnectSql.ConRead(), CommandType.StoredProcedure, "dbo.Call_ListGroup", null).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    outInfo.AddRange(from DataRow dtr in dt.Rows
                                     select new OutListGroup
                        {
                            GroupsID = SqlHelper.CheckIntNull(dtr["GroupsID"]),
                            GroupsName = SqlHelper.CheckStringNull(dtr["GroupsName"]),
                            Status = SqlHelper.CheckIntNull(dtr["Status"]),
                            CreateBy = SqlHelper.CheckStringNull(dtr["CreateBy"]),
                            Description = SqlHelper.CheckStringNull(dtr["Description"]),
                            CreateDate = SqlHelper.CheckStringNull(dtr["CreateDate"])
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