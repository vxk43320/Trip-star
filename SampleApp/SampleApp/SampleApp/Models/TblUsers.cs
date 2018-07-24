using System;
using System.Collections.Generic;

namespace SampleApp.Models
{
    public partial class TblUsers
    {
        public TblUsers()
        {
            TblBooking = new HashSet<TblBooking>();
            TblHost = new HashSet<TblHost>();
            TblReviews = new HashSet<TblReviews>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Dob { get; set; }
        public string EmailId { get; set; }
        public long? Phone { get; set; }
        public string PreferredLanguage { get; set; }
        public string PreferredCurrency { get; set; }
        public string Address { get; set; }
        public string Remarks { get; set; }

        public string Password { get; set; }
        public string usertype { get; set; }

        public virtual ICollection<TblBooking> TblBooking { get; set; }
        public virtual ICollection<TblHost> TblHost { get; set; }
        public virtual ICollection<TblReviews> TblReviews { get; set; }
    }
}
