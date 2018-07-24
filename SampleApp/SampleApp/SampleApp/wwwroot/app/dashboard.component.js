"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tripstarservice_1 = require("./tripstarservice");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var platform_browser_1 = require("@angular/platform-browser");
var DashboardComponent = (function () {
    function DashboardComponent(route, http, tripstarservice, myElement, appCompnt, _DomSanitizationService, router) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.tripstarservice = tripstarservice;
        this.appCompnt = appCompnt;
        this._DomSanitizationService = _DomSanitizationService;
        this.router = router;
        this.heroes = [];
        this.Experience = [];
        this.Home = [];
        this.hosts = [];
        this.bookings = [];
        this.bookingsexp = [];
        this.trips = [];
        this.openhst = [];
        this.availability = [];
        this.date = new Date();
        this.Getsselectedhst = [];
        this.hostexps = [];
        this.hostblk = [];
        this.Getshostexps = [];
        this.frsttab = true;
        this.secondtab = false;
        this.thirdtab = false;
        this.Fourthtab = false;
        this.isBookingRoom = false;
        this.Bookingselected = [];
        this.Bookingsexpelected = [];
        this.Tripsselected = [];
        this.Showtripdetails = false;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.http.post('/api/Tripstar/GetHosts', JSON.stringify(''), { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            //{
            var gethsts = result;
            for (var hst in gethsts) {
                var itemimag = gethsts[hst].photo;
                if (itemimag != "" && itemimag != null) {
                    gethsts[hst].photo = _this._DomSanitizationService.bypassSecurityTrustUrl(itemimag);
                    //this.src = this._DomSanitizationService.bypassSecurityTrustUrl(this.ItemImage);
                    //var src = this.src;
                }
                else {
                    gethsts[hst].photo;
                }
            }
            _this.hosts = result.filter(function (x) { return x.Type.toLowerCase() == 'home'; });
            _this.Getsselectedhst = result.filter(function (x) { return x.Type.toLowerCase() == 'home'; });
            _this.hostexps = result.filter(function (x) { return x.Type.toLowerCase() == 'experience'; });
            _this.Getshostexps = result.filter(function (x) { return x.Type.toLowerCase() == 'experience'; });
            // this.router.navigate(['Login']);
            //}
        }, function (err) { return console.log(err); });
        if (this.tripstarservice.UserID != null && this.tripstarservice.UserType == 'Host') {
            this.http.post('/api/Tripstar/GetBookingsByHostID', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                //{
                _this.bookings = result;
                _this.Bookingselected = result;
                _this.bookings = result.filter(function (x) { return x.Type.toLowerCase() == 'home'; });
                _this.Bookingselected = result.filter(function (x) { return x.Type.toLowerCase() == 'home'; });
                _this.bookingsexp = result.filter(function (x) { return x.Type.toLowerCase() == 'experience'; });
                _this.Bookingsexpelected = result.filter(function (x) { return x.Type.toLowerCase() == 'experience'; });
                //this.Getsselectedhst = result;
                // this.router.navigate(['Login']);
                //}
            }, function (err) { return console.log(err); });
        }
        if (this.tripstarservice.UserID != null && this.tripstarservice.UserType == 'User') {
            this.http.post('/api/Tripstar/GetBookingsByUserID', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                //{
                _this.trips = result;
                _this.Tripsselected = result;
                console.log("This are Trips");
                console.log(_this.trips);
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
            }, function (err) { return console.log(err); });
        }
    }
    DashboardComponent.prototype.MessageSelection = function (val) {
        if (val !== "") {
            this.bookings = this.Bookingselected.filter(function (x) { return x.BookingID == val; });
        }
        else {
            this.bookings = [];
        }
    };
    DashboardComponent.prototype.showTrips = function (val) {
        this.Showtripdetails = true;
    };
    DashboardComponent.prototype.BacktoRooms = function (val) {
        this.Showtripdetails = false;
    };
    DashboardComponent.prototype.BacktoBookings = function () {
        this.bookings = this.Bookingselected;
    };
    DashboardComponent.prototype.chckindate = function (val) {
        this.booking_CheckIn = val;
    };
    DashboardComponent.prototype.checkoutdate = function (val) {
        this.booking_CheckOut = val;
    };
    DashboardComponent.prototype.BookRoom = function (host) {
        var _this = this;
        this.isBookingRoom = true;
        if (this.tripstarservice.UserID != "" && this.tripstarservice.UserID != '0') {
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
                this.tripstarservice.getBlockingById(host.HostID).subscribe(function (result) {
                    if (result.length != 0) {
                        console.log("First");
                        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                            var avail = result_1[_i];
                            console.log("inside loop");
                            if (avail.IsBlocked) {
                                if (new Date(_this.booking_CheckIn).getTime() < new Date(avail.BlockIn).getTime()) {
                                    if (new Date(_this.booking_CheckOut).getTime() < new Date(avail.BlockIn).getTime()) {
                                        var one = new Date(_this.booking_CheckOut).getTime();
                                        var two = new Date(avail.BlockIn).getTime();
                                        error = "false";
                                    }
                                    else {
                                        error = "true";
                                        alert("Room is blocked by Host from " + avail.BlockIn + " to " + avail.CheckOut + "please choose other dates");
                                        break;
                                    }
                                }
                                else if (new Date(_this.booking_CheckIn).getTime() >= new Date(avail.BlockIn).getTime()) {
                                    if (new Date(_this.booking_CheckIn).getTime() < new Date(avail.CheckOut).getTime()) {
                                        error = "true";
                                        alert("Room is blocked by Host from " + avail.BlockIn + " to " + avail.CheckOut + "please choose other dates");
                                        break;
                                    }
                                    else {
                                        error = "false";
                                    }
                                }
                            }
                        }
                    }
                });
                if (error == 'false') {
                    //console.log(error);
                    this.tripstarservice.getHostsById(host.HostID).subscribe(function (result) {
                        console.log("Second");
                        _this.availability = result;
                        if (_this.availability != null && error == 'false') {
                            console.log(error);
                            for (var _i = 0, _a = _this.availability; _i < _a.length; _i++) {
                                var avail = _a[_i];
                                if (avail.IsApproved && error == 'false') {
                                    console.log(avail);
                                    if (new Date(_this.booking_CheckIn).getTime() < new Date(avail.CheckIn).getTime()) {
                                        if (new Date(_this.booking_CheckOut).getTime() < new Date(avail.CheckIn).getTime()) {
                                            error = "false";
                                        }
                                        else {
                                            console.log("second ");
                                            alert("Room is not available from " + avail.CheckIn + " to " + avail.CheckOut + "please choose other dates");
                                            error = "true";
                                            break;
                                        }
                                    }
                                    else if (new Date(_this.booking_CheckIn).getTime() >= new Date(avail.CheckIn).getTime()) {
                                        if (new Date(_this.booking_CheckIn).getTime() < new Date(avail.CheckOut).getTime()) {
                                            alert("Room is booked from " + avail.CheckIn + " to " + avail.CheckOut + "please choose other dates");
                                            error = "true";
                                            break;
                                        }
                                        else {
                                            error = "false";
                                        }
                                    }
                                }
                            }
                        }
                        if (error == "false") {
                            ///
                            _this.booking_UserID = host.UserID;
                            //this.booking_Noofguests = this.appCompnt.Guests;
                            var x = _this.booking_Noofguests;
                            _this.booking_IsApproved = false;
                            _this.booking_HostID = host.HostID;
                            var bookingDetails = {
                                "booking_UserID": _this.tripstarservice.UserID,
                                //"PlaceID":
                                "booking_CheckIn": _this.booking_CheckIn,
                                "booking_CheckOut": _this.booking_CheckOut,
                                "booking_Noofguests": _this.booking_Noofguests,
                                "booking_IsApproved": _this.booking_IsApproved,
                                "booking_HostID": _this.booking_HostID
                            };
                            var data = [{ "hostHeader": bookingDetails }];
                            _this.headers = new http_1.Headers();
                            _this.headers.append('Content-Type', 'application/json');
                            _this.http.post('/api/Tripstar/PostBooking', JSON.stringify(data), { headers: _this.headers })
                                .map(function (response) { return response.json(); })
                                .subscribe(function (result) {
                                if (result != 'false' && error == 'false') {
                                    _this.tripstarservice.bookingID = result;
                                    _this.tripstarservice.bookingstatu = 'Booking Done Waiting for Approval';
                                    _this.router.navigate(['booking']);
                                }
                            }, function (err) { return console.log(err); });
                        } //
                    });
                }
            }
        }
        else {
            alert("Please Sign in to continue booking");
            this.router.navigate(['Login']);
        }
    };
    DashboardComponent.prototype.checkNoGuests = function (val) {
        this.booking_Noofguests = val;
    };
    DashboardComponent.prototype.openhost = function (value) {
        if (this.isBookingRoom == false) {
            this.tripstarservice.openhstID = value;
            this.router.navigate(['host']);
        }
        else {
            this.isBookingRoom = false;
        }
    };
    DashboardComponent.prototype.onChangeapprove = function (value) {
        var _this = this;
        if (value.IsApproved == true) {
            this.http.post('/api/Tripstar/UpdBateookingbybookID', JSON.stringify(value.BookingID), { headers: this.headers })
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                if (result) {
                    _this.tripstarservice.bookingstatu = 'Booking Approved';
                    _this.tripstarservice.bookingID = value.BookingID;
                    _this.router.navigate(['booking']);
                }
                else {
                    _this.tripstarservice.bookingstatu = 'Waiting for Approval';
                    _this.tripstarservice.bookingID = value.BookingID;
                    _this.router.navigate(['booking']);
                }
                //{
                // this.bookings = result;
                //this.Getsselectedhst = result;
                // this.router.navigate(['Login']);
                //}
            }, function (err) { return console.log(err); });
        }
        else {
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
            .map(function (response) { return response.json(); }).subscribe(function (result) { return result; });
    };
    DashboardComponent.prototype.GetselectedHosts = function (value) {
        if (value !== "") {
            this.hosts = this.Getsselectedhst.filter(function (x) { return x.Place.toLowerCase() == value.toLowerCase(); });
        }
        else {
            this.hosts = [];
        }
    };
    DashboardComponent.prototype.Exper = function () {
        this.heroes = [];
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tripstarservice.getHeroes()
            .then(function (heroes) {
            _this.heroes = heroes.slice(1, 4);
            _this.Experience = heroes.slice(5, 9);
            _this.Home = heroes.slice(10, 14);
        });
    };
    DashboardComponent.prototype.Roomtype = function (val) {
        if (val !== "") {
            this.hosts = this.Getsselectedhst.filter(function (x) { return x.Roomtype.toLowerCase() == val.toLowerCase(); });
        }
        else {
            this.hosts = [];
        }
    };
    DashboardComponent.prototype.PriceRange = function (val1, val2) {
        if (val2 !== "") {
            this.hosts = this.Getsselectedhst.filter(function (x) { return (x.Price >= val1) && (x.Price <= val2); });
        }
        else {
            this.hosts = [];
        }
    };
    DashboardComponent.prototype.tabevent = function (value) {
        if (value == 'First') {
            this.frsttab = true;
            this.secondtab = false;
            this.thirdtab = false;
            this.Fourthtab = false;
        }
        else if (value == 'Second') {
            this.frsttab = false;
            this.secondtab = true;
            this.thirdtab = false;
            this.Fourthtab = false;
        }
        else if (value == 'Third') {
            if (this.hostblk.length == 0) {
                for (var _i = 0, _a = this.hosts; _i < _a.length; _i++) {
                    var host = _a[_i];
                    if (host.UserID == this.tripstarservice.UserID) {
                        this.hostblk.push(host);
                    }
                }
                for (var _b = 0, _c = this.hostexps; _b < _c.length; _b++) {
                    var host = _c[_b];
                    if (host.UserID == this.tripstarservice.UserID) {
                        this.hostblk.push(host);
                    }
                }
            }
            console.log(this.hostblk);
            this.frsttab = false;
            this.secondtab = false;
            this.thirdtab = true;
            this.Fourthtab = false;
        }
        else if (value == 'Resturant') {
            this.frsttab = false;
            this.secondtab = false;
            this.thirdtab = false;
            this.Fourthtab = true;
        }
    };
    // new changes
    DashboardComponent.prototype.blockRoom = function (hst) {
        var error = false;
        console.log(this.bookings);
        console.log(this.bookingsexp);
        for (var _i = 0, _a = this.bookings; _i < _a.length; _i++) {
            var book = _a[_i];
            if (book.IsApproved) {
                if (new Date(this.blockInDate).getTime() < new Date(book.CheckIn).getTime()) {
                    if (new Date(this.blockOutDate).getTime() < new Date(book.CheckIn).getTime()) {
                        error = false;
                    }
                    else {
                        console.log("second ");
                        alert("Room is already booked by Customer from " + book.CheckIn + " to " + book.CheckOut);
                        error = true;
                        break;
                    }
                }
                else if (new Date(this.blockInDate).getTime() >= new Date(book.CheckIn).getTime()) {
                    if (new Date(this.blockInDate).getTime() <= new Date(book.CheckOut).getTime()) {
                        alert("Room is already booked by Customer from " + book.CheckIn + " to " + book.CheckOut);
                        error = true;
                        break;
                    }
                    else {
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
                .map(function (response) { return response.json(); })
                .subscribe(function (result) { return result; });
            alert("Your room is blocked from " + this.blockInDate + " to " + this.blockOutDate);
            this.tabevent('First');
            console.log(this.blockInDate);
            console.log(this.blockOutDate);
        }
    };
    DashboardComponent.prototype.blockInDateChange = function (event) {
        this.blockInDate = event.target.value;
        console.log(this.blockInDate);
    };
    DashboardComponent.prototype.blockOutDateChange = function (event) {
        this.blockOutDate = event.target.value;
        console.log(this.blockOutDate);
    };
    DashboardComponent.prototype.toCancle = function (checkIn) {
        var date = new Date(checkIn);
        var present = new Date();
        if (present.getTime() < date.getTime()) {
            return true;
        }
        else
            return false;
    };
    DashboardComponent.prototype.cancleRoom = function (bookingId) {
        var _this = this;
        this.tripstarservice.deleteBooking(bookingId);
        alert("Your Booking has been cancled");
        this.Showtripdetails = false;
        this.http.post('/api/Tripstar/GetBookingsByUserID', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            _this.trips = result;
        });
    };
    DashboardComponent.prototype.lastMonth = function () {
        var previous = new Date();
        previous.setDate(previous.getDate() - 30);
        // console.log(this.trips);
        var newTrips = [];
        for (var _i = 0, _a = this.trips; _i < _a.length; _i++) {
            var trip = _a[_i];
            var date = new Date(trip.CheckIn);
            if (!(date.getTime() < previous.getTime())) {
                newTrips.push(trip);
            }
        }
        console.log("New Trips");
        console.log(newTrips);
        this.trips = newTrips;
    };
    DashboardComponent.prototype.all = function () {
        var _this = this;
        this.http.post('/api/Tripstar/GetBookingsByUserID', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            //{
            _this.trips = result;
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'my-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css', './SignUp.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.Http, tripstarservice_1.tripstarservice, core_1.ElementRef, app_component_1.AppComponent, platform_browser_1.DomSanitizer,
        router_1.Router])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map