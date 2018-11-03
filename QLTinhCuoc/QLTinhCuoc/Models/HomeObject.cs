using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Web;

namespace QLTinhCuoc.Models
{
    public class Menuroot
    {
        private List<Menu> datas = new List<Menu>();
        public List<Menu> Data
        {
            get { return datas; }
            set { this.datas = value; }
        }
        public int MenuRootID { get; set; }
        public string MenuRootName { get; set; }
       }

    public class Menu
    {
        public int MenuID { get; set; }
        public string MenuName { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
    }
}