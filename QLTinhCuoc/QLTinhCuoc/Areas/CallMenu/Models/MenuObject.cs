using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.CallMenu.Models
{
    public class OutMenuUser
    {
        public int MenuID { get; set; }
        public string MenuName { get; set; }
        public int Status { get; set; }
        public string UserName { get; set; }
    }

    public class IntMenuUser
    {
        public int Search { get; set; }
        public int MenuRootID { get; set; }
        public string UserName { get; set; }
    }
    public class IUMenuUser
    {
        public string UserName { get; set; }
        public int MenuID { get; set; }
        public int Status { get; set; }
        public string UpdateBy { get; set; }
    }
    public class OutMenuGroup
    {
        public int MenuID { get; set; }
        public string MenuName { get; set; }
        public int Status { get; set; }
        public int GroupsID { get; set; }
    }
    public class IntMenuGroup
    {
        public int Search { get; set; }
        public int MenuRootID { get; set; }
        public int GroupsID { get; set; }
    }
    public class IUGroupsMenu
    {
        public int GroupsID { get; set; }
        public int MenuID { get; set; }
        public int Status { get; set; }
        public string UpdateBy { get; set; }
    }
    
}