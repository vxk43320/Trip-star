using System;
using System.Collections.Generic;

namespace SampleApp.Models
{
    public partial class TblPlaces
    {
        public TblPlaces()
        {
            TblHost = new HashSet<TblHost>();
        }

        public int PlaceId { get; set; }
        public string Place { get; set; }

        public virtual ICollection<TblHost> TblHost { get; set; }
    }
}
