using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLTinhCuoc.Areas.CallFixedDial.Models
{
    public class IntNewFixedDial
    {
        public int LocationID { get; set; }
        public string PostalCode { get; set; }
        public string Description { get; set; }
        public int TypeFixedDialID { get; set; }
        public string CreateBy { get; set; }
        public int Status { get; set; }

    }
    public class IntListFixedDial
    {
        public int Search { get; set; }
        public string PostalCode { get; set; }
        public int LocationID { get; set; }
        public int TypeFixedDialID { get; set; }

    }
    public class OutListFixedDial
    {
        public string PostalCode { get; set; }
        public string TypeFixedDialName { get; set; }
        public string LocationName { get; set; }
        public string CreateBy { get; set; }
        public string Description { get; set; }

    }

}