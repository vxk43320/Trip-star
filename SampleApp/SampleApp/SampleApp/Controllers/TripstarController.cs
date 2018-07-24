using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SampleApp.Helperclasses;
using System.Collections.ObjectModel;
using Newtonsoft.Json;
using SampleApp.Models;
using System.Net.Mail;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SampleApp.Controllers
{
    [Route("api/[controller]")]
    public class TripstarController : Controller
    {
        ProxyUser prxyuser;//=new ProxyUser();
        ProxyHost prxyhost;
        ProxyBooking prxybooking;
        ProxyLogin prxylogin;
        TripstarContext _TripstarContext = new TripstarContext();

        [HttpPost("authenticate")]
        public IEnumerable<TblUsers> Authentication([FromBody] dynamic id)
        {
            //ObservableCollection<Dictionary<string, object>> detailcollection = new ObservableCollection<Dictionary<string, object>>();
            //Dictionary<string, object> InvoiceStatus = new Dictionary<string, object>();
            //int UserId=0;
            IEnumerable<TblUsers> User = null;
            try
            {


                ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));
                string Status = string.Empty;
                foreach (Dictionary<string, object> header in obj)
                {

                    //Status = header["Status"].ToString();
                    prxylogin = JsonConvert.DeserializeObject<ProxyLogin>(Convert.ToString(header["LogIn"].ToString()));


                    //Invoicedetail = JsonConvert.DeserializeObject<List<ProxyInvoiceDetails>>(Convert.ToString(header["SalesDetail"].ToString()));

                }
                User = (from rec in _TripstarContext.TblUsers where rec.EmailId == prxylogin.UserName && rec.Password == prxylogin.Password select rec).ToList();
                //return _repository.PostInvoice(Status, Headerdata, Invoicedetail);
                return User;
            }
            catch (Exception ex)
            {

                //InvoiceStatus["Status"] = "Fail";
                //InvoiceStatus["Error"] = "please check log file..";
                //detailcollection.Add(InvoiceStatus);
                //File.AppendAllText(AppDomain.CurrentDomain.BaseDirectory + "Log\\Errorlog.txt", ex.ToString());
                return User;
            }
        }


        TblUsers tbluser;
        [HttpPost("PostUser")]
        public string PostUser([FromBody] dynamic id)
        {
            //ObservableCollection<Dictionary<string, object>> detailcollection = new ObservableCollection<Dictionary<string, object>>();
            //Dictionary<string, object> InvoiceStatus = new Dictionary<string, object>();
            string InvoiceId = string.Empty;
            try
            {


                ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));
                string Status = string.Empty;
                foreach (Dictionary<string, object> header in obj)
                {

                    //Status = header["Status"].ToString();
                    prxyuser = JsonConvert.DeserializeObject<ProxyUser>(Convert.ToString(header["UserHeader"].ToString()));


                    //Invoicedetail = JsonConvert.DeserializeObject<List<ProxyInvoiceDetails>>(Convert.ToString(header["SalesDetail"].ToString()));

                }

                var users = (from rec in _TripstarContext.TblUsers where rec.FirstName == prxyuser.login_firstname.ToString() select rec).FirstOrDefault();
                if(users==null)
                {
                    tbluser = new TblUsers();
                    tbluser.Address = prxyuser.login_address;
                    tbluser.Dob = prxyuser.login_dob;
                    tbluser.EmailId = prxyuser.login_EmailID;
                    tbluser.FirstName = prxyuser.login_firstname;
                    tbluser.LastName = prxyuser.login_lastname;
                    tbluser.Phone = Convert.ToInt64(prxyuser.login_phone);
                    tbluser.PreferredCurrency = prxyuser.login_prefercurrency;
                    tbluser.PreferredLanguage = prxyuser.login_preferLanguage;
                    tbluser.Remarks = prxyuser.login_Remarks;
                    tbluser.Password = prxyuser.login_password;
                    tbluser.usertype = prxyuser.UserType;
                    //tbluser.password
                    _TripstarContext.Add(tbluser);
                    _TripstarContext.SaveChanges();
                }
                else
                {
                    tbluser=(from rec in _TripstarContext.TblUsers where rec.FirstName == prxyuser.login_firstname.ToString() select rec).FirstOrDefault();

                    tbluser.Address = prxyuser.login_address;
                    tbluser.Dob = prxyuser.login_dob;
                    tbluser.EmailId = prxyuser.login_EmailID;
                    tbluser.FirstName = prxyuser.login_firstname;
                    tbluser.LastName = prxyuser.login_lastname;
                    tbluser.Phone = Convert.ToInt64(prxyuser.login_phone);
                    tbluser.PreferredCurrency = prxyuser.login_prefercurrency;
                    tbluser.PreferredLanguage = prxyuser.login_preferLanguage;
                    tbluser.Remarks = prxyuser.login_Remarks;
                    tbluser.Password = prxyuser.login_password;
                    tbluser.usertype = prxyuser.UserType;
                    //tbluser.password
                    //_TripstarContext.Add(tbluser);
                    _TripstarContext.SaveChanges();

                }
              

                //return _repository.PostInvoice(Status, Headerdata, Invoicedetail);
                return "true";
            }
            catch (Exception ex)
            {

                //InvoiceStatus["Status"] = "Fail";
                //InvoiceStatus["Error"] = "please check log file..";
                //detailcollection.Add(InvoiceStatus);
                //File.AppendAllText(AppDomain.CurrentDomain.BaseDirectory + "Log\\Errorlog.txt", ex.ToString());
                return "false";
            }
        }

        // new Changes
        [HttpPost("BlockRoom")]

        public void BlockRoom([FromBody] dynamic id)
        {

            try
            {

                ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));
                foreach (Dictionary<string, object> header in obj)
                {

                    //Status = header["Status"].ToString();
                    prxybooking = JsonConvert.DeserializeObject<ProxyBooking>(Convert.ToString(header["UserHeader"].ToString()));


                    //Invoicedetail = JsonConvert.DeserializeObject<List<ProxyInvoiceDetails>>(Convert.ToString(header["SalesDetail"].ToString()));

                    TblBlocking tblBlocking = new TblBlocking();
                    tblBlocking.BlockIn = Convert.ToDateTime(prxybooking.booking_CheckIn);
                    tblBlocking.BlockOut = Convert.ToDateTime(prxybooking.booking_CheckOut);
                    tblBlocking.HostId = prxybooking.booking_UserID;
                    tblBlocking.IsBlocked = prxybooking.booking_IsApproved;
                    _TripstarContext.Add(tblBlocking);
                    _TripstarContext.SaveChanges();
                }
            }
            catch(Exception ex)
            {
            }



        }






        TblBooking tblBooking;
        [HttpPost("deleteBooking")]
        public void deleteBooking([FromBody] dynamic id)
        {
           // ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));
            int bookingID = Convert.ToInt32(id);

             tblBooking = (from rec in _TripstarContext.TblBooking where rec.BookingId == bookingID select rec).FirstOrDefault();
           
            _TripstarContext.Remove(tblBooking);

            _TripstarContext.SaveChanges();

        }



        [HttpPost("sendMail")]
        public void sendMail([FromBody] dynamic id)
        {
            ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));

            foreach (Dictionary<string, object> header in obj)
            {
                prxybooking = JsonConvert.DeserializeObject<ProxyBooking>(Convert.ToString(header["UserHeader"].ToString()));
                try
                {
                    MailMessage mailMessage = new MailMessage();
                    mailMessage.To.Add(prxybooking.booking_Email);
                    mailMessage.From = new MailAddress("tripstar321@gmail.com");
                    mailMessage.Subject = "ASP.NET e-mail test";
                    mailMessage.Body = "Hello"+ prxybooking.booking_Name+ " ,\n\nYour Booking has been confirmed by Host from "+ prxybooking.booking_CheckIn+" to "+ prxybooking.booking_CheckOut+"/n Your Booking ID is "+ prxybooking.booking_HostID;
                    SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                    smtpClient.Credentials = new System.Net.NetworkCredential()
                    {
                        UserName = "tripstar321@gmail.com",
                        Password = "Tripstar11!"
                    };
                    smtpClient.EnableSsl = true;
                    smtpClient.Send(mailMessage);
                    
                }
                catch (Exception ex)
                {

                }
            }
        }

        //

        [HttpPost("EditUser")]
        public ObservableCollection<Dictionary<string, object>>Edituser([FromBody] dynamic id)
        {


          
                ObservableCollection<Dictionary<string, object>> Getedituser = new ObservableCollection<Dictionary<string, object>>();


                Dictionary<string, object> GeteditCollection;// = new Dictionary<string, object>();

                try
                {
                int userid=Convert.ToInt32(id);
                    var users = (from rec in _TripstarContext.TblUsers where rec.UserId == userid select rec).FirstOrDefault();
                    //foreach (TblUsers hosts in users)
                    //{
                        if (users != null)
                        {
                            GeteditCollection = new Dictionary<string, object>();
                            
                           
                    GeteditCollection["Address"]=users.Address;
                    GeteditCollection["Dob"]=users.Dob;
                    GeteditCollection["EmailId"]=users.EmailId;
                    GeteditCollection["FirstName"]=users.FirstName;
                    GeteditCollection["LastName"]=users.LastName;
                    GeteditCollection["Phone"] = Convert.ToInt64(users.Phone);
                    GeteditCollection["PreferredCurrency"]=users.PreferredCurrency;
                    GeteditCollection["PreferredLanguage"]=users.PreferredLanguage;
                    GeteditCollection["Remarks"]=users.Remarks;
                    GeteditCollection["Password"]=users.Password;
                    GeteditCollection["usertype"]=users.usertype;

                  //  GeteditCollection["Price"] = hosts.Price;
                            Getedituser.Add(GeteditCollection);
                        }

                   // }
                    return Getedituser;
              
               
            }
            catch (Exception ex)
            {
                return null;
            }

           

        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        [HttpGet("Places")]
        public IEnumerable<TblPlaces> GetPlaces()
        {
            return _TripstarContext.TblPlaces.Where(x => x.Place != null).ToList();
        }


        [HttpPost("PostHost")]
        public string PostHost([FromBody] dynamic id)
        {
            //ObservableCollection<Dictionary<string, object>> detailcollection = new ObservableCollection<Dictionary<string, object>>();
            //Dictionary<string, object> InvoiceStatus = new Dictionary<string, object>();
            string InvoiceId = string.Empty;
            try
            {


                ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));
                string Status = string.Empty;
                foreach (Dictionary<string, object> header in obj)
                {

                    //Status = header["Status"].ToString();
                    prxyhost = JsonConvert.DeserializeObject<ProxyHost>(Convert.ToString(header["hostHeader"].ToString()));


                    //Invoicedetail = JsonConvert.DeserializeObject<List<ProxyInvoiceDetails>>(Convert.ToString(header["SalesDetail"].ToString()));

                }
                TblHost tblhost = new TblHost();
                var rechost = (from rec in _TripstarContext.TblHost where rec.HostId == prxyhost.HostID && rec.UserId == prxyhost.UserID select rec).FirstOrDefault();
                if (rechost == null)
                {
                    var places = (from rec in _TripstarContext.TblPlaces where rec.Place == prxyhost.Place select rec).FirstOrDefault();
                    if (places != null)
                        tblhost.PlaceId = places.PlaceId;
                    //tblhost.Photo = prxyhost.photo;
                    if (prxyhost.photo != null)
                    {
                        prxyhost.photo = prxyhost.photo.Replace("data:image/png;base64,", "");
                        byte[] data1 = Convert.FromBase64String(prxyhost.photo.Replace("data:image/jpeg;base64,", ""));
                        tblhost.Photo = data1;
                    }
                    else
                    {
                        tblhost.Photo = null;
                    }
                    tblhost.Price = Convert.ToDecimal(prxyhost.Price);
                    tblhost.Roomtype = prxyhost.Roomtype;
                    tblhost.UserId = Convert.ToInt32(prxyhost.UserID);
                    tblhost.Description = prxyhost.Description;
                   tblhost.Type = prxyhost.Type;
                    //tbluser.password
                    _TripstarContext.Add(tblhost);
                }
                else
                {
                    TblHost tblhostupdate = (from rec in _TripstarContext.TblHost where rec.HostId == prxyhost.HostID && rec.UserId == prxyhost.UserID select rec).FirstOrDefault();
                    tblhostupdate.Review = prxyhost.Review;
                }

                _TripstarContext.SaveChanges();

                //return _repository.PostInvoice(Status, Headerdata, Invoicedetail);
                return "true";
            }
            catch (Exception ex)
            {


                return "false";
            }
        }


        [HttpPost("PostReview")]
        public string PostReview([FromBody] dynamic id)
        {
            //ObservableCollection<Dictionary<string, object>> detailcollection = new ObservableCollection<Dictionary<string, object>>();
            //Dictionary<string, object> InvoiceStatus = new Dictionary<string, object>();
            string InvoiceId = string.Empty;
            try
            {


                ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));
                string Status = string.Empty;
                foreach (Dictionary<string, object> header in obj)
                {

                    //Status = header["Status"].ToString();
                    prxyhost = JsonConvert.DeserializeObject<ProxyHost>(Convert.ToString(header["hostHeader"].ToString()));


                    //Invoicedetail = JsonConvert.DeserializeObject<List<ProxyInvoiceDetails>>(Convert.ToString(header["SalesDetail"].ToString()));

                }
                TblReviews _tblReview = new TblReviews();
                _tblReview.HostId = prxyhost.HostID;
                _tblReview.UserId = prxyhost.UserID;
                _tblReview.Review = prxyhost.Review;
                _TripstarContext.Add(_tblReview);

                _TripstarContext.SaveChanges();

                //return _repository.PostInvoice(Status, Headerdata, Invoicedetail);
                return "true";
            }
            catch (Exception ex)
            {


                return "false";
            }
        }



        [HttpPost("PostBooking")]
        public string PostBooking([FromBody] dynamic id)
        {

            try
            {


                ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));
                string Status = string.Empty;
                foreach (Dictionary<string, object> header in obj)
                {


                    prxybooking = JsonConvert.DeserializeObject<ProxyBooking>(Convert.ToString(header["hostHeader"].ToString()));


                }
                TblBooking tblbooking = new TblBooking();
                tblbooking.CheckIn = Convert.ToDateTime(prxybooking.booking_CheckIn);
                tblbooking.CheckOut = Convert.ToDateTime(prxybooking.booking_CheckOut);
                tblbooking.HostId = prxybooking.booking_HostID;
                tblbooking.UsreId = prxybooking.booking_UserID;
                tblbooking.Nofguests = prxybooking.booking_Noofguests;
                tblbooking.IsApproved = prxybooking.booking_IsApproved;
                _TripstarContext.Add(tblbooking);
                _TripstarContext.SaveChanges();

                var bookingid = tblbooking.BookingId;
                return Convert.ToString(bookingid);
            }
            catch (Exception ex)
            {


                return "false";
            }
        }

        [HttpPost("GetHosts")]

        public ObservableCollection<Dictionary<string, object>> GetHosts()
        {

            ObservableCollection<Dictionary<string, object>> GetHost = new ObservableCollection<Dictionary<string, object>>();


            Dictionary<string, object> GetHostCollection;// = new Dictionary<string, object>();

            try
            {
                var hostes = (from rec in _TripstarContext.TblHost where rec.HostId != null select rec).ToList();
                foreach (TblHost hosts in hostes)
                {
                    if (hosts != null)
                    {
                        GetHostCollection = new Dictionary<string, object>();
                        GetHostCollection["HostID"] = hosts.HostId;
                        GetHostCollection["PlaceID"] = hosts.PlaceId;
                        if (hosts.PlaceId != null)
                        {
                            var places = (from rec in _TripstarContext.TblPlaces where rec.PlaceId == hosts.PlaceId select rec).FirstOrDefault();
                            if (hosts != null)
                            {
                                GetHostCollection["Place"] = places.Place;
                            }
                            else
                            {
                                GetHostCollection["Place"] = null;
                            }
                        }
                        GetHostCollection["Roomtype"] = hosts.Roomtype;
                        GetHostCollection["Description"] = hosts.Description;

                        //GetHostCollection["photo"] = hosts.Photo;
                        byte[] imgBytes = (byte[])hosts.Photo;
                        string imgString = Convert.ToBase64String(imgBytes);
                        var Image = String.Format("data:image/png;base64,{0}", imgString);
                        //byte[] imgBytes = (byte[])dataReader[iFiled];
                        //string imgString = Convert.ToBase64String(imgBytes);
                        //var Image = String.Format("data:image/jpeg;base64,{0}", imgString);
                        //dataRow.Add("ItemImage", Image);
                        //var Image = String.Format("data:image/jpeg;base64,{0}", imgString);
                        GetHostCollection["photo"] = Image;

                        GetHostCollection["UserID"] = hosts.UserId;
                        var users = (from rec in _TripstarContext.TblUsers where rec.UserId == hosts.UserId select rec).FirstOrDefault();
                        if (users != null)
                        {
                            GetHostCollection["EmailID"] = users.EmailId;
                        }

                        GetHostCollection["Type"] = hosts.Type;
                        GetHostCollection["Price"] = hosts.Price;
                        GetHost.Add(GetHostCollection);
                    }

                }
                return GetHost;
            }
            catch (Exception ex)
            {
                return null;
            }
            Console.WriteLine("heloo");

        }
        // new changes
        [HttpPost("GetBookingsByHost")]

        public ObservableCollection<Dictionary<string, object>> GetBookingsByHost([FromBody] dynamic id)
        {
            ObservableCollection<Dictionary<string, object>> GetHost = new ObservableCollection<Dictionary<string, object>>();
            Dictionary<string, object> GetHostCollection;
            try
            {
                int hostid = Convert.ToInt32(id);

                var bookings = (from rec in _TripstarContext.TblBooking where rec.HostId == hostid select rec).ToList();

                foreach (var booking in bookings)
                {
                    GetHostCollection = new Dictionary<string, object>();

                    GetHostCollection["BookingID"] = booking.BookingId;
                    GetHostCollection["hostid"] = booking.HostId;
                    GetHostCollection["UserID"] = booking.UsreId;
                    GetHostCollection["CheckIn"] = booking.CheckIn;

                    GetHostCollection["CheckOut"] = booking.CheckOut;
                    GetHostCollection["Nofguests"] = booking.Nofguests;

                    GetHostCollection["IsApproved"] = booking.IsApproved;

                    GetHost.Add(GetHostCollection);
                }
                return GetHost;
            } 
            catch (Exception ex)
            {
                return null;
            }
   
        }

        [HttpPost("GetBlockingByHost")]

        public ObservableCollection<Dictionary<string, object>> GetBlockingByHost([FromBody] dynamic id)
        {
            ObservableCollection<Dictionary<string, object>> GetHost = new ObservableCollection<Dictionary<string, object>>();
            Dictionary<string, object> GetHostCollection;
            try
            {
                int hostid = Convert.ToInt32(id);

                var bookings = (from rec in _TripstarContext.TblBlocking where rec.HostId == hostid select rec).ToList();

                foreach (var booking in bookings)
                {
                    GetHostCollection = new Dictionary<string, object>();

                    GetHostCollection["BlockID"] = booking.BlockingId;
                    GetHostCollection["HostId"] = booking.HostId;

                    GetHostCollection["BlockIn"] = booking.BlockIn;

                    GetHostCollection["CheckOut"] = booking.BlockOut;

                    GetHostCollection["IsBlocked"] = booking.IsBlocked;

                    GetHost.Add(GetHostCollection);
                }
                return GetHost;
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        //
        [HttpPost("GetBookingsByHostID")]

        public ObservableCollection<Dictionary<string, object>> GetBookingsByHostID([FromBody] dynamic id)
        {

            ObservableCollection<Dictionary<string, object>> GetHost = new ObservableCollection<Dictionary<string, object>>();


            Dictionary<string, object> GetHostCollection;// = new Dictionary<string, object>();

            try
            {
                int userid = Convert.ToInt32(id);
                var hosts = (from rec in _TripstarContext.TblHost where rec.UserId == userid select rec).ToList();
                foreach (TblHost host in hosts)
                {
                    if (host != null)
                    {
                        var bookings = (from rec in _TripstarContext.TblBooking where rec.HostId == host.HostId select rec).ToList();
                        foreach (var booking in bookings)
                        {
                            GetHostCollection = new Dictionary<string, object>();

                            GetHostCollection["Name"] = (from rec in _TripstarContext.TblUsers where rec.UserId == booking.UsreId select rec.FirstName).FirstOrDefault();
                            // New Changes
                            GetHostCollection["Email"] = (from rec in _TripstarContext.TblUsers where rec.UserId == booking.UsreId select rec.EmailId).FirstOrDefault();
                            //
                            GetHostCollection["BookingID"] = booking.BookingId;
                            GetHostCollection["hostid"] = booking.HostId;

                            GetHostCollection["Roomtype"] = host.Roomtype;
                            GetHostCollection["Type"] = host.Type;
                            GetHostCollection["CheckIn"] = booking.CheckIn;

                            GetHostCollection["CheckOut"] = booking.CheckOut;
                            GetHostCollection["Nofguests"] = booking.Nofguests;

                            GetHostCollection["IsApproved"] = booking.IsApproved;

                            GetHostCollection["Price"] = host.Price;
                            GetHost.Add(GetHostCollection);
                        }
                    }

                }
                return GetHost;
            }
            catch (Exception ex)
            {
                return null;
            }


        }

     
        [HttpPost("GetBookingsByUserID")]

        public ObservableCollection<Dictionary<string, object>> GetBookingsByUserID([FromBody] dynamic id)
        {

            ObservableCollection<Dictionary<string, object>> GetHost = new ObservableCollection<Dictionary<string, object>>();


            Dictionary<string, object> GetHostCollection;// = new Dictionary<string, object>();

            try
            {
                int userid = Convert.ToInt32(id);
                
                 
                        var bookings = (from rec in _TripstarContext.TblBooking where rec.UsreId == userid select rec).ToList();
                        if(bookings !=null)
                        {
                            foreach (var booking in bookings)
                            {
                                GetHostCollection = new Dictionary<string, object>();
                                var host = (from rec in _TripstarContext.TblHost where rec.HostId == booking.HostId select rec).FirstOrDefault();
                                GetHostCollection["Place"] = (from rec in _TripstarContext.TblPlaces where rec.PlaceId == host.PlaceId select rec.Place).FirstOrDefault();
                                GetHostCollection["BookingID"] = booking.BookingId;
                                GetHostCollection["hostid"] = booking.HostId;

                                GetHostCollection["Roomtype"] = host.Roomtype;
                                GetHostCollection["CheckIn"] = booking.CheckIn;

                                GetHostCollection["CheckOut"] = booking.CheckOut;
                                GetHostCollection["Nofguests"] = booking.Nofguests;

                                GetHostCollection["IsApproved"] = booking.IsApproved;

                                GetHostCollection["Price"] = host.Price;
                                GetHost.Add(GetHostCollection);
                            }

                    }



                return GetHost;
            }
            catch (Exception ex)
            {
                return null;
            }


        }



        [HttpPost("UpdBateookingbybookID")]
        public string UpdBateooking([FromBody] dynamic id)
        {

            try
            {


                //ObservableCollection<IDictionary<string, object>> obj = JsonConvert.DeserializeObject<ObservableCollection<IDictionary<string, object>>>(Convert.ToString(id));
                //string Status = string.Empty;
                //foreach (Dictionary<string, object> header in obj)
                //{


                //    prxybooking = JsonConvert.DeserializeObject<ProxyBooking>(Convert.ToString(header["hostHeader"].ToString()));


                //}

                int bookid = Convert.ToInt32(id);
                // var tblboking = (from rec in _TripstarContext.TblBooking where rec.BookingId == bookid select rec).FirstOrDefault();
                TblBooking tblbooking = (from rec in _TripstarContext.TblBooking where rec.BookingId == bookid select rec).FirstOrDefault();
                if (tblbooking != null)
                {

                    tblbooking.IsApproved = true;
                    // _TripstarContext.Add(tblbooking);
                    _TripstarContext.SaveChanges();
                }

                return "true";
            }
            catch (Exception ex)
            {


                return "false";
            }
        }

        [HttpPost("ShowNotification")]
        public List<TblBooking> ShowNotification([FromBody] dynamic id)
        {
            bool count = false;
            List<TblBooking> openapprovalcount = null;
            try
            {

                int userid = Convert.ToInt32(id);
                int HostID = (from rec in _TripstarContext.TblHost where rec.UserId == userid select rec.HostId).FirstOrDefault();
                openapprovalcount = (from rec in _TripstarContext.TblBooking where rec.HostId == HostID && rec.IsApproved == false select rec).ToList();
                if (openapprovalcount.Count() > 0)
                {
                    count = true;
                }

                return openapprovalcount;
            }
            catch (Exception ex)
            {
                return openapprovalcount;
            }
        }


        [HttpPost("OpenhstByHostID")]

        public ObservableCollection<Dictionary<string, object>> OpenhstByHostID([FromBody] dynamic id)
        {

            ObservableCollection<Dictionary<string, object>> GetHst = new ObservableCollection<Dictionary<string, object>>();
            ObservableCollection<Dictionary<string, object>> GetReviews = new ObservableCollection<Dictionary<string, object>>();


            Dictionary<string, object> GetHstCollection;// = new Dictionary<string, object>();
            Dictionary<string, object> review;
            try
            {
                int hstid = Convert.ToInt32(id);
                var hosts = (from rec in _TripstarContext.TblHost where rec.HostId == hstid select rec).FirstOrDefault();
                //foreach (TblHost host in hosts)
                //{
                //if (host != null)
                //{
                //var bookings = (from rec in _TripstarContext.TblBooking where rec.HostId == host.HostId select rec).ToList();
                //foreach (var booking in bookings)
                //{
                GetHstCollection = new Dictionary<string, object>();

                //  GetHstCollection["Name"] = (from rec in _TripstarContext.TblUsers where rec.UserId == userid select rec.FirstName).FirstOrDefault();
                byte[] imgBytes = (byte[])hosts.Photo;
                string imgString = Convert.ToBase64String(imgBytes);
                var Image = String.Format("data:image/png;base64,{0}", imgString);
                GetHstCollection["Photo"] = Image;
                GetHstCollection["hostid"] = hosts.HostId;

                GetHstCollection["Roomtype"] = hosts.Roomtype;
                GetHstCollection["Place"] = (from rec in _TripstarContext.TblPlaces where rec.PlaceId == hosts.PlaceId select rec.Place).FirstOrDefault();
                GetHstCollection["Review"] = hosts.Review;
                var reviews = (from rec in _TripstarContext.TblReviews where rec.HostId == hstid select rec).ToList();
                foreach (TblReviews revw in reviews)
                {
                    review = new Dictionary<string, object>();
                    review["Reviewdescription"] = revw.Review;
                    review["user"] = (from rec in _TripstarContext.TblUsers where rec.UserId == revw.UserId select rec.FirstName).FirstOrDefault();
                    GetReviews.Add(review);
                }
                GetHstCollection["Reviews"] = GetReviews;

                GetHstCollection["Description"] = hosts.Description;
                GetHstCollection["User"] = hosts.User;

                /*  GetHstCollection["IsApproved"] = hosts.IsApproved;*/

                GetHstCollection["Price"] = hosts.Price;
                GetHst.Add(GetHstCollection);
                //}
                //}

                //}
                return GetHst;
            }
            catch (Exception ex)
            {
                return null;
            }


        }
     
        [HttpPost("OpenBookingbyID")]

        public ObservableCollection<Dictionary<string, object>> OpenBookingbyID([FromBody] dynamic id)
        {

            ObservableCollection<Dictionary<string, object>> GetHst = new ObservableCollection<Dictionary<string, object>>();


            Dictionary<string, object> GetHstCollection;// = new Dictionary<string, object>();

            try
            {
                int bookingid = Convert.ToInt32(id);
                var booking = (from rec in _TripstarContext.TblBooking where rec.BookingId == bookingid select rec).FirstOrDefault();

                GetHstCollection = new Dictionary<string, object>();


                GetHstCollection["CheckIn"] = booking.CheckIn;
                GetHstCollection["CheckOut"] = booking.CheckOut;

                GetHstCollection["NoUsers"] = booking.Nofguests;

                GetHstCollection["User"] = (from rec in _TripstarContext.TblUsers where rec.UserId == booking.UsreId select rec.FirstName).FirstOrDefault();

                GetHst.Add(GetHstCollection);
                //}
                //}

                //}
                return GetHst;
            }
            catch (Exception ex)
            {
                return null;
            }


        }
        //public 

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5

    }
}
