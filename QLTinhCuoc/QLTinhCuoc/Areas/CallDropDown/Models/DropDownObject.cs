using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.CallDropDown.Models
{
    public class OutGetCompany
    {
        public int CompanyID { get; set; }

        public string CompanyName { get; set; }
    }
    public class OutGetBrach
    {
        public int BranchID { get; set; }

        public string BranchName { get; set; }
    }
    public class OutGetDepartment
    {
        public int DepartmentID { get; set; }

        public string DepartmentName { get; set; }
    }

    public class OutGetRole
    {
        public int RoleID { get; set; }

        public string RoleName { get; set; }
    }

    public class GetTypeFixedDialName
    {
        public int TypeFixedDialID { get; set; }

        public string TypeFixedDialName { get; set; }
    }

    public class GetLocation
    {
        public int LocationID { get; set; }

        public string LocationName { get; set; }
    }
    public class GetMenuRoot
    {
        public int MenuRootID { get; set; }

        public string MenuRootName { get; set; }
    }
    public class GetGroups
    {
        public int GroupsID { get; set; }

        public string GroupsName { get; set; }
    }
}