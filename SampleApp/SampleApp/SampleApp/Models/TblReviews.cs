using System;
using System.Collections.Generic;

namespace SampleApp.Models
{
    public partial class TblReviews
    {
        public int ReviewId { get; set; }
        public int? HostId { get; set; }
        public string Review { get; set; }
        public int? UserId { get; set; }

        public virtual TblHost Host { get; set; }
        public virtual TblUsers User { get; set; }
    }
}
