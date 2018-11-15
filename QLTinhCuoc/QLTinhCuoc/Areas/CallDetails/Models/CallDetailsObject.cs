using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.CallDetails.Models
{
    public class OutListCallDetails
    {
        public string UserName { get; set; }
        public string TotalTimeCalled { get; set; }
        public float Total { get; set; }
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string CompanyName { get; set; }
    }

    public class OutListDetailsRP
    {
        public string UserName { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string TotalTimeCalled { get; set; }
        public float Total { get; set; }
        public string LocationNameFrom { get; set; }
        public string LocationNameTo { get; set; }
        public string TypeFixedDialName { get; set; }
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string CompanyName { get; set; }
    }

    public class IntCallDetails
    {
        public string Search { get; set; }
        public string UserName { get; set; }
        public int CompanyID { get; set; }
        public int BranchID { get; set; }
        public int DepartmentID { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

    }
    public class IntTopCallDetails
    {
        public string Search { get; set; }
        public string Top { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

    }
}