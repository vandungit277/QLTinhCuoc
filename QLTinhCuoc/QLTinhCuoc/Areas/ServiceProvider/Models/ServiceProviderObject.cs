using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.ServiceProvider.Models
{
    public class OutGetServiceCharge
    {
       
        public int ServiceProviderID { get; set; }
        public int TypeCallID { get; set; }
        public string NameServiceProvider { get; set; }
        public int block1 { get; set; }
        public float price1 { get; set; }
        public int block2 { get; set; }
        public float price2 { get; set; }
        public string NameTypeCall { get; set; }

       
    }

    public class OutNNewServiceCharge
    {
        public int Code { get; set; }

        public string Desc { get; set; }
    }

    public class IntNNewServiceCharge
    {
        public int ServiceProviderID { get; set; }
        public int TypeCallID { get; set; }
        public int Status { get; set; }
        public int block1 { get; set; }
        public float price1 { get; set; }
        public int block2 { get; set; }
        public float price2 { get; set; }
        public string UpdateBy { get; set; }
    }
    public class OutGetTypeCall
    {
        public int TypeCallID { get; set; }

        public string NameTypeCall { get; set; }
    }
    
}