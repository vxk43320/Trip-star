using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApp.Helperclasses
{
    public class ProxyUser
    {
       public Int32 login_userid{ get; set; }
       public String login_Remarks{ get; set; }
       public String login_Confirmpaasword{ get; set; }
       public String login_password{ get; set; }
       public String login_address{ get; set; }
       public String login_prefercurrency{ get; set; }
       public String login_preferLanguage{ get; set; }
       public String login_EmailID{ get; set; }
       public DateTime? login_dob{ get; set; }

        public String UserType { get; set; }
        public String login_lastname{ get; set; }
       public String login_firstname{ get; set; }
        public String login_phone { get; set; }

    }
}
