using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.CallUser.Models
{
    public class OutInfoUser
    {
        public int StaffID { get; set; }
        public int Status { get; set; }
        public string StaffName { get; set; }
        public string Birthdays { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Passport { get; set; }
        public string DayIn { get; set; }
        public string RoleName { get; set; }
        public string UserName { get; set; }
        public string IPPhone { get; set; }
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string CompanyName { get; set; }

    }

    public class InInfoUser
    {
        public string UserName { get; set; }
    }
}