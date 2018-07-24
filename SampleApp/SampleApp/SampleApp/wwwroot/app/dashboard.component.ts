import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Hero }        from './hero';
import { tripstarservice } from './tripstarservice';
import { Http, Headers, Response } from '@angular/http';
import { AppComponent } from './app.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './SignUp.css' ]
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    Experience: Hero[] = [];
    Home: Hero[] = [];
    hosts: any = [];
    bookings: any = [];
    bookingsexp: any = [];
    trips: any = [];
    openhst: any = [];
    availability: any = [];

    headers: any;
    userHeader: any;
    blockInDate: Date;
    blockOutDate: Date;
    date = new Date();
    IsApproved:any;
    Getsselectedhst: any = [];
    hostexps: any = [];
    hostblk: any = [];
    Getshostexps: any = [];
    frsttab=true;secondtab=false;thirdtab=false;Fourthtab=false;
    constructor(public route: ActivatedRoute, public http: Http, private tripstarservice: tripstarservice, myElement: ElementRef, public appCompnt: AppComponent, public _DomSanitizationService: DomSanitizer,
        public router: Router) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.http.post('/api/Tripstar/GetHosts', JSON.stringify(''), { headers: this.headers })
            .map(response => response.json())
            .subscribe(result => {
                 //{
                
                var gethsts = result;

                for (var hst in gethsts)
                {

                    var itemimag = gethsts[hst].photo;
                    if (itemimag != "" && itemimag != null) {
                        gethsts[hst].photo = this._DomSanitizationService.bypassSecurityTrustUrl(itemimag);
                        //this.src = this._DomSanitizationService.bypassSecurityTrustUrl(this.ItemImage);
                        //var src = this.src;
                    }
                    else {
                        gethsts[hst].photo;
                    }
                }
                
                this.hosts = result.filter((x: any) => x.Type.toLowerCase() == 'home');
                this.Getsselectedhst = result.filter((x: any) => x.Type.toLowerCase() == 'home');

                this.hostexps = result.filter((x: any) => x.Type.toLowerCase() == 'experience');
                this.Getshostexps = result.filter((x: any) => x.Type.toLowerCase() == 'experience');
                    // this.router.navigate(['Login']);
                //}
            },
            err => console.log(err)
            );
       if (this.tripstarservice.UserID != null && this.tripstarservice.UserType == 'Host')
        {
            this.http.post('/api/Tripstar/GetBookingsByHostID', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
                .map(response => response.json())
                .subscribe(result => {
                    //{
                    this.bookings = result;
                    this.Bookingselected = result;

                    this.bookings = result.filter((x: any) => x.Type.toLowerCase() == 'home');
                    this.Bookingselected = result.filter((x: any) => x.Type.toLowerCase() == 'home');

                    this.bookingsexp = result.filter((x: any) => x.Type.toLowerCase() == 'experience');
                    this.Bookingsexpelected = result.filter((x: any) => x.Type.toLowerCase() == 'experience');
                    //this.Getsselectedhst = result;
                    // this.router.navigate(['Login']);
                    //}
                },
                err => console.log(err)
                );

        }
       if (this.tripstarservice.UserID != null && this.tripstarservice.UserType == 'User') {
           this.http.post('/api/Tripstar/GetBookingsByUserID', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
               .map(response => response.json())
               .subscribe(result => {
                   //{
                   this.trips = result;
                   this.Tripsselected = result;
                   console.log("This are Trips");
                  console.log(this.trips);
           //        for (let row of this.trips){
           //            this.date = new Date(row.CheckIn);
           //            console.log(this.date.getTime());
           //            console.log(new Date(this.date.getTime()));
           //            this.date = new Date(row.CheckOut);
           //            console.log(this.date.getTime());
           //         console.log(new Date(this.date.getTime()));
           //}
                   //this.Getsselectedhst = result;
                   // this.router.navigate(['Login']);
                   //}
               },
               err => console.log(err)
               );

       }
        
       
    }

    booking_UserID: any;
    booking_HostID: any;
    booking_CheckIn: any;
    booking_CheckOut: any;
    booking_Noofguests: any;
    booking_IsApproved: any;
    isBookingRoom: any = false;
    Bookingselected: any = [];
    Bookingsexpelected: any = [];
    Tripsselected: any = [];

    MessageSelection(val: any)
    {
        
         if(val !== "")
            {
                this.bookings = this.Bookingselected.filter((x:any) => x.BookingID == val);
            
            }
           
        else {
            this.bookings = [];
        }
    }
    Showtripdetails = false;
    showTrips(val: any)
    {
        this.Showtripdetails = true;
    }
    BacktoRooms(val: any)
    {
        this.Showtripdetails = false;
    }

    BacktoBookings()
    {
      this.bookings = this.Bookingselected;
    }

    chckindate(val: any)
    {
        this.booking_CheckIn = val;
    }

    checkoutdate(val: any)
    {
        this.booking_CheckOut = val;
    }

    BookRoom(host:any)
    {
        this.isBookingRoom = true;
        if (this.tripstarservice.UserID != "" && this.tripstarservice.UserID != '0')
        {
            if (this.booking_CheckIn == undefined) {

                alert("Select CheckIn Date" + host.HostID);
            }
            else if (this.booking_CheckOut == undefined) {
                alert("Select CheckOut Date");
            }
            else if (this.booking_Noofguests == undefined) {
                alert("Enter no of guests");
            }
            else {
                /// new changes
                var error = "false";
                this.tripstarservice.getBlockingById(host.HostID).subscribe(result => {

                    if (result.length != 0) {
                        console.log("First");
                        for (let avail of result) {
                            console.log("inside loop");
                            if (avail.IsBlocked) {
                                if (new Date(this.booking_CheckIn).getTime() < new Date(avail.BlockIn).getTime()) {

                                    if (new Date(this.booking_CheckOut).getTime() < new Date(avail.BlockIn).getTime()) {
                                        let one = new Date(this.booking_CheckOut).getTime();
                                        let two = new Date(avail.BlockIn).getTime();
                                        error = "false";
                                    } else {
                                        error = "true";
                                       alert("Room is blocked by Host from " + avail.BlockIn + " to " + avail.CheckOut + "please choose other dates");
                                        break;
                                    }
                                } else if (new Date(this.booking_CheckIn).getTime() >= new Date(avail.BlockIn).getTime()) {
                                    if (new Date(this.booking_CheckIn).getTime() < new Date(avail.CheckOut).getTime()) {
                                        error = "true";
                                       alert("Room is blocked by Host from " + avail.BlockIn + " to " + avail.CheckOut + "please choose other dates");
                                        break;
                                    } else {
                                        error = "false";
                                    }
                                }
                            }
                        }
                    }

                });
                if (error == 'false') {
                    //console.log(error);
                    this.tripstarservice.getHostsById(host.HostID).subscribe(result => {
                        console.log("Second");
                    this.availability = result;
                    if (this.availability != null && error == 'false') {
                        console.log(error);
                        for (let avail of this.availability) {
                            if (avail.IsApproved && error == 'false') {
                                console.log(avail);
                                if (new Date(this.booking_CheckIn).getTime() < new Date(avail.CheckIn).getTime()) {

                                    if (new Date(this.booking_CheckOut).getTime() < new Date(avail.CheckIn).getTime()) {
                                        error = "false";
                                    } else {

                                        console.log("second ");
                                        alert("Room is not available from " + avail.CheckIn + " to " + avail.CheckOut + "please choose other dates");
                                        error = "true";
                                        break;
                                    }
                                } else if (new Date(this.booking_CheckIn).getTime() >= new Date(avail.CheckIn).getTime()) {
                                    if (new Date(this.booking_CheckIn).getTime() < new Date(avail.CheckOut).getTime()) {
                                        alert("Room is booked from " + avail.CheckIn + " to " + avail.CheckOut + "please choose other dates");
                                        error = "true";
                                        break;
                                    } else {
                                        error = "false";
                                    }
                                }
                            }
                        }
                    }
                    if (error == "false") {

                        ///
                        this.booking_UserID = host.UserID;
                        //this.booking_Noofguests = this.appCompnt.Guests;
                        var x = this.booking_Noofguests;
                        this.booking_IsApproved = false;
                        this.booking_HostID = host.HostID;
                        var bookingDetails = {

                            "booking_UserID": this.tripstarservice.UserID,
                            //"PlaceID":
                            "booking_CheckIn": this.booking_CheckIn,
                            "booking_CheckOut": this.booking_CheckOut,
                            "booking_Noofguests": this.booking_Noofguests,
                            "booking_IsApproved": this.booking_IsApproved,
                            "booking_HostID": this.booking_HostID
                        }

                        var data = [{ "hostHeader": bookingDetails }];
                        this.headers = new Headers();
                        this.headers.append('Content-Type', 'application/json');
                        this.http.post('/api/Tripstar/PostBooking', JSON.stringify(data), { headers: this.headers })
                            .map(response => response.json())
                            .subscribe(result => {
                                if (result != 'false' && error == 'false') {
                                    this.tripstarservice.bookingID = result;
                                    this.tripstarservice.bookingstatu = 'Booking Done Waiting for Approval';
                                    this.router.navigate(['booking']);
                                }
                            },
                            err => console.log(err)
                            );
                    } //
                });
            }
            }
            
        }
        else
        {
            alert("Please Sign in to continue booking");
            this.router.navigate(['Login'])
        }
       
    }

    checkNoGuests(val: any)
    {
        this.booking_Noofguests = val;
    }

    openhost(value: any)
    {
        if (this.isBookingRoom == false) {
            this.tripstarservice.openhstID = value;
            this.router.navigate(['host']);
        }
        else
        {
            this.isBookingRoom = false;
        }
    }

    onChangeapprove(value: any)
    {
        if (value.IsApproved == true)
        {
            
            this.http.post('/api/Tripstar/UpdBateookingbybookID', JSON.stringify(value.BookingID), { headers: this.headers })
                .map(response => response.json())
                .subscribe(result => {
                    if (result)
                    {
                        this.tripstarservice.bookingstatu = 'Booking Approved';
                        this.tripstarservice.bookingID = value.BookingID;
                        this.router.navigate(['booking']);
                    }
                    else
                    {
                        this.tripstarservice.bookingstatu = 'Waiting for Approval';
                        this.tripstarservice.bookingID = value.BookingID;
                        this.router.navigate(['booking']);
                    }
                    //{
                   // this.bookings = result;
                    //this.Getsselectedhst = result;
                    // this.router.navigate(['Login']);
                    //}
                },
                err => console.log(err)
                );
        }
        else
        {

        }

        this.userHeader = {
            "booking_HostID": value.BookingID,
            "booking_Name": value.Name,
            "booking_CheckIn": value.CheckIn,
            "booking_CheckOut": value.CheckOut,
            "booking_Email": value.Email
        };
        var data = [{ "UserHeader": this.userHeader }];
        this.http.post('/api/Tripstar/sendMail', JSON.stringify(data), { headers: this.headers })
            .map(response => response.json()).subscribe(result => result);
    }

    GetselectedHosts(value: any)
    {

            if(value !== "")
            {
                this.hosts = this.Getsselectedhst.filter((x:any) => x.Place.toLowerCase() == value.toLowerCase());
            
            }
           
        else {
            this.hosts = [];
        }

    }

Exper()
{
  this.heroes = [];
}
  ngOnInit(): void {
      this.tripstarservice.getHeroes()
          .then(heroes => {
              this.heroes = heroes.slice(1, 4);
              this.Experience = heroes.slice(5, 9);
              this.Home = heroes.slice(10, 14);
          });

    
}
  Roomtype(val:any)
  {
      if (val !== "") {
          this.hosts = this.Getsselectedhst.filter((x: any) => x.Roomtype.toLowerCase() == val.toLowerCase());

      }

      else {
          this.hosts = [];
      }
  }
  PriceRange(val1: any,val2:any)
  {
      if (val2 !== "") {
          this.hosts = this.Getsselectedhst.filter((x: any) => (x.Price >= val1) && (x.Price <= val2));

      }

      else {
          this.hosts = [];
      }
  }
tabevent(value:any)
{
    if(value == 'First')
    {
        this.frsttab=true;
        this.secondtab=false;
        this.thirdtab=false;
this.Fourthtab=false;
    }
   else if(value == 'Second')
    {
        this.frsttab=false;
        this.secondtab=true;
        this.thirdtab=false;
this.Fourthtab=false;
    }
    else if (value == 'Third')
    {
        if (this.hostblk.length==0){
        for (let host of this.hosts) {
            if (host.UserID == this.tripstarservice.UserID) {
                this.hostblk.push(host);
            }
        }
        for (let host of this.hostexps) {
            if (host.UserID == this.tripstarservice.UserID) {
                this.hostblk.push(host);
            }
        }
        }
        console.log(this.hostblk);
        this.frsttab=false;
        this.secondtab=false;
        this.thirdtab=true;
this.Fourthtab=false;
    }
 else if(value == 'Resturant')
    {
        this.frsttab=false;
        this.secondtab=false;
        this.thirdtab=false;
        this.Fourthtab=true;
    }
}

// new changes
    blockRoom(hst: any) {
        var error = false;
        console.log(this.bookings);
        console.log(this.bookingsexp);
        for (let book of this.bookings) {
            if (book.IsApproved) {

                if (new Date(this.blockInDate).getTime() < new Date(book.CheckIn).getTime()) {

                    if (new Date(this.blockOutDate).getTime() < new Date(book.CheckIn).getTime()) {
                        error = false;
                    } else {

                        console.log("second ");
                        alert("Room is already booked by Customer from " + book.CheckIn + " to " + book.CheckOut);
                        error = true;
                        break;
                    }
                } else if (new Date(this.blockInDate).getTime() >= new Date(book.CheckIn).getTime()) {
                    if (new Date(this.blockInDate).getTime() <= new Date(book.CheckOut).getTime()) {
                        alert("Room is already booked by Customer from " + book.CheckIn + " to " + book.CheckOut);
                        error = true;
                        break;
                    } else {
                        error = false;
                    }
                }
            }
        }
    this.userHeader = {
        "booking_UserID": hst,
        "booking_CheckIn": this.blockInDate,
        "booking_CheckOut": this.blockOutDate,
        "booking_IsApproved": true
        };
    if (!error) {
        var data = [{ "UserHeader": this.userHeader }];
        this.http.post('/api/Tripstar/BlockRoom', JSON.stringify(data), { headers: this.headers })
            .map(response => response.json())
            .subscribe(result => result);
        alert("Your room is blocked from " + this.blockInDate + " to " + this.blockOutDate);
        this.tabevent('First');
        console.log(this.blockInDate);
        console.log(this.blockOutDate);
    }
}

    blockInDateChange(event: any) {
        this.blockInDate = event.target.value;
    console.log(this.blockInDate);
    }

    blockOutDateChange(event: any) {
        this.blockOutDate = event.target.value;
    console.log(this.blockOutDate);
}


    toCancle(checkIn: string) {
        let date = new Date(checkIn);
        let present = new Date();
        if (present.getTime() < date.getTime()) {
            return true;
        } else
            return false;
    }

    cancleRoom(bookingId: string) {

        this.tripstarservice.deleteBooking(bookingId);
        alert("Your Booking has been cancled");
        this.Showtripdetails = false;
        this.http.post('/api/Tripstar/GetBookingsByUserID', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
            .map(response => response.json())
            .subscribe(result => {
                this.trips = result; 
            });
    }

    lastMonth() {
        let previous = new Date();
        previous.setDate(previous.getDate() - 30);
       // console.log(this.trips);
       let newTrips: any = [];
        for (let trip of this.trips) {
            let date = new Date(trip.CheckIn);
            if (!(date.getTime() < previous.getTime()))
            {
                newTrips.push(trip);
            }
        }
        console.log("New Trips");
        console.log(newTrips);
        this.trips = newTrips;
    }
    all() {
        this.http.post('/api/Tripstar/GetBookingsByUserID', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
            .map(response => response.json())
            .subscribe(result => {
                //{
                this.trips = result;

            });
    }
}
