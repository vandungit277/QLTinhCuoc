using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace QL_Model
{
    public class Function
    {
        public static string Sha256encrypt(string phrase)
        {
            var encoder = new UTF8Encoding();
            var sha256hasher = new SHA256Managed();
            var hashedDataBytes = sha256hasher.ComputeHash(encoder.GetBytes(phrase));
            return Convert.ToBase64String(hashedDataBytes);
        }
        public static string FormatDateSQL(string date)
        {
            var strDate = date.Split('/');
            return strDate[2] + "/" + strDate[1] + "/" + strDate[0];
        }
    }
}