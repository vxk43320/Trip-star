using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApp.Models
{
    public class TblBlocking
    {
        public int BlockingId { get; set; }
        public int? HostId { get; set; }
        public DateTime? BlockIn { get; set; }
        public DateTime? BlockOut { get; set; }
        public bool? IsBlocked { get; set; }
        
    }
}
