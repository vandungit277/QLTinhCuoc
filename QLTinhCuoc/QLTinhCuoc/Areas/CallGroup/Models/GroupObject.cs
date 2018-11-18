using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.CallGroup.Models
{
    public class IntNewGroup
    {
        public string GroupsName { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public string CreateBy { get; set; }
    }
    public class OutListGroup
    {
        public int GroupsID { get; set; }
        public string GroupsName { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public string CreateBy { get; set; }
        public string CreateDate { get; set; }
    }

    public class IUGroupStaffDetail
    {
        public int GroupsID { get; set; }  
        public string Description { get; set; }
        public int Status { get; set; }
        public string StaffID { get; set; }
        public string UpdateBy { get; set; }
    }

    public class IntGetGroupStaffDetail
    {
        public string Search { get; set; }
        public int GroupsID { get; set; }
        public string UserName { get; set; }       
    }
    public class OutGetGroupStaffDetail
    {
        public int GroupsID { get; set; }
        public int StaffID { get; set; }
        public string GroupsName { get; set; }
        public int Status { get; set; }
    }
}