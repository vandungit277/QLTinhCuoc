using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.PhoneInside.Models
{
    public class OutGetServiceProvider
    {
        public int ServiceProviderID { get; set; }

        public string NameServiceProvider { get; set; }
    }
    public class IntNewIPPhoneInside
    {
        public string UserName { get; set; }

        public int ServiceProviderID { get; set; }

        public string IPPhone { get; set; }

        public int Status { get; set; }
        public string Description { get; set; }

        public string CreateBy { get; set; }
    }

    public class OutNewIPPhoneInside
    {
        public int Code { get; set; }

        public string Desc { get; set; }
    }


    public class OutInfoIPPhoneInside
    {
        public string StaffName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string CompanyName { get; set; }
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string IPPhone { get; set; }
        public string NameServiceProvider { get; set; }
    }


}