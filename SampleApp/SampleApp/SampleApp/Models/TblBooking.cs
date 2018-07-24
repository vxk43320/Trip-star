using System;
using System.Collections.Generic;

namespace SampleApp.Models
{
    public partial class TblBooking
    {
        public int BookingId { get; set; }
        public int? HostId { get; set; }
        public int? UsreId { get; set; }
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public int? Nofguests { get; set; }
        public bool? IsApproved { get; set; }

        public virtual TblHost Host { get; set; }
        public virtual TblUsers Usre { get; set; }
    }
}
