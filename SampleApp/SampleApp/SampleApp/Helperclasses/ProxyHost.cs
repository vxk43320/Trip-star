using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApp.Helperclasses
{
    public class ProxyHost
    {
      public Int32?  UserID { get; set; }
        public Int32? PlaceID{ get; set; }
        public Int32? HostID { get; set; }
        public string Place { get; set; }
        public string Roomtype{ get; set; }
        public string Review { get; set; }
        
        public string Description{ get; set; }
        public string photo{ get; set; }
        public decimal? Price{ get; set; }
        public string Type;
    }
}
