using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApp.Helperclasses
{
    public class ProxyBooking
    {
        public Int32 booking_UserID { get; set; }
        public Int32 booking_HostID { get; set; }
        public string booking_Name { get; set; }
        public string booking_Email { get; set; }
        public string booking_CheckIn { get; set; }
        public string booking_CheckOut { get; set; }
        public Int32 booking_Noofguests { get; set; }
        public bool booking_IsApproved { get; set; }
        
    }
}
