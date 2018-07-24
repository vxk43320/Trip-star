using System;
using System.Collections.Generic;

namespace SampleApp.Models
{
    public partial class TblHost
    {
        public TblHost()
        {
            TblBooking = new HashSet<TblBooking>();
            TblReviews = new HashSet<TblReviews>();
        }

        public int HostId { get; set; }
        public int PlaceId { get; set; }
        public string Roomtype { get; set; }
        public string Review { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public byte[] Photo { get; set; }
        public int UserId { get; set; }
        public decimal Price { get; set; }

        public virtual ICollection<TblBooking> TblBooking { get; set; }
        public virtual ICollection<TblReviews> TblReviews { get; set; }
        public virtual TblPlaces Place { get; set; }
        public virtual TblUsers User { get; set; }
    }
}
