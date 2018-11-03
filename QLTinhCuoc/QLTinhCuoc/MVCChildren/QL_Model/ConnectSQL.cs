using System.Web.Configuration;

namespace QL_Model
{
  
    public class ConnectSql
    {        
        public static string ConRead()
        {


            var connectionString = WebConfigurationManager.ConnectionStrings["sqlConnectionRead"].ConnectionString;
            return connectionString;
        }
        public static string ConWrite()
        {
            var connectionString = WebConfigurationManager.ConnectionStrings["sqlConnectionWrite"].ConnectionString;
            return connectionString;
        }
    }   
}
