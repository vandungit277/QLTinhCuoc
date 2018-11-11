using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.CallManagement.Models
{
    public class OutListCallManagement
    {
        public string UserName { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string TotalTimeCalled { get; set; }
        public float Total { get; set; }
        public string LocationNameFrom { get; set; }
        public string LocationNameTo { get; set; }
        public string TypeFixedDialName { get; set; }
    }

    public class IntCallManagement
    {
        public string Search { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
   
    }
}