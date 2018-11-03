using System;
using System.IO;
using System.Web;

namespace QL_Model
{
    public class WriteLog
    {
        public static void writeLogError(Exception ex)
        {
            try
            {
                string logMessage = ex.Message + " ; " + ex.ToString();
                string strLogMessage = string.Empty;
                if (!Directory.Exists(HttpContext.Current.Server.MapPath("//Logs//Error//")))
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("///Logs//Error//"));
                string strLogFile = HttpContext.Current.Server.MapPath("//Logs//Error//" + string.Format("{0}-{1}-{2}", DateTime.Now.Day, DateTime.Now.Month, DateTime.Now.Year) + ".txt");
                StreamWriter swLog;

                strLogMessage = string.Format("{0}: {1}", DateTime.Now, HttpContext.Current.Request.Path + "\r\n" + logMessage);

                if (!File.Exists(strLogFile))
                {
                    swLog = new StreamWriter(strLogFile);
                }
                else
                {
                    swLog = File.AppendText(strLogFile);
                }

                swLog.WriteLine(strLogMessage);
                swLog.WriteLine();

                swLog.Close();
            }
            catch (Exception)
            {
            }
        }

        public static void writeLogRequest(string content)
        {
            try
            {
                string logMessage = content;
                string strLogMessage = string.Empty;
                if (!Directory.Exists(HttpContext.Current.Server.MapPath("//Logs//Request//")))
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("//Logs//Request//"));
                string strLogFile = HttpContext.Current.Server.MapPath("//Logs//Request//" + string.Format("{0}-{1}-{2}", DateTime.Now.Day, DateTime.Now.Month, DateTime.Now.Year) + ".txt");
                StreamWriter swLog;

                strLogMessage = string.Format("{0}: {1}", DateTime.Now, HttpContext.Current.Request.Path + "\r\n" + logMessage);

                if (!File.Exists(strLogFile))
                {
                    swLog = new StreamWriter(strLogFile);
                }
                else
                {
                    swLog = File.AppendText(strLogFile);
                }

                swLog.WriteLine(strLogMessage);
                swLog.WriteLine();

                swLog.Close();
            }
            catch (Exception)
            {
            }
        }

        public static void writeLogResponse(string content)
        {
            try
            {
                string logMessage = content;
                string strLogMessage = string.Empty;
                if (!Directory.Exists(HttpContext.Current.Server.MapPath("//Logs//Response//")))
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("//Logs//Response//"));
                string strLogFile = HttpContext.Current.Server.MapPath("//Logs//Response//" + string.Format("{0}-{1}-{2}", DateTime.Now.Day, DateTime.Now.Month, DateTime.Now.Year) + ".txt");
                StreamWriter swLog;

                strLogMessage = string.Format("{0}: {1}", DateTime.Now, HttpContext.Current.Request.Path + "\r\n" + logMessage);

                if (!File.Exists(strLogFile))
                {
                    swLog = new StreamWriter(strLogFile);
                }
                else
                {
                    swLog = File.AppendText(strLogFile);
                }

                swLog.WriteLine(strLogMessage);
                swLog.WriteLine();

                swLog.Close();
            }
            catch (Exception)
            {
            }
        }
    }
}