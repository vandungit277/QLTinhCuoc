﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.CallStaff.Models
{
    public class IntNewStaff
    {
        public int DepartmentID { get; set; }
        public int SexID { get; set; }
        public int RoleID { get; set; }
        public string StaffName { get; set; }
        public string Birthdays { get; set; }
        public string Address { get; set; }
        public int Status { get; set; }
        public string DayIn { get; set; }
        public string Passport { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string CreateBy { get; set; }

    }

    public class IntListStaff
    {
        public string Search { get; set; }
        public string UserName { get; set; }
        public int ConpanyID { get; set; }
        public int BranchID { get; set; }
        public int DepartmentID { get; set; }
   
    }

    public class OutListStaff
    {
        public string StaffName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Birthdays { get; set; }
        public string Address { get; set; }
        public string SexName { get; set; }
        public string RoleName { get; set; }
        public string DayIn { get; set; }
        public string Passport { get; set; }
        public string CompanyName { get; set; }
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string IPPhone { get; set; }
        public string NameServiceProvider { get; set; }

    }
}