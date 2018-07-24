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
var tripstarservice_1 = require("./tripstarservice");
var http_1 = require("@angular/http");
//import { DashboardComponent } from './dashboard.component';
var router_1 = require("@angular/router");
var TopNavigationComponent = (function () {
    function TopNavigationComponent(tripstarservice, router, http) {
        var _this = this;
        this.tripstarservice = tripstarservice;
        this.router = router;
        this.http = http;
        this.title = 'TripStar';
        this.Signup = "Sign Up";
        this.Login = "Log In";
        this.place = "";
        this.showpopup = false;
        this.chkinDate = ''; //new Date();
        this.chkoutDate = ''; //new Date();
        this.placechangeevent = new core_1.EventEmitter();
        this.chkindt = new core_1.EventEmitter();
        this.chkoutdt = new core_1.EventEmitter();
        this.guestschanged = new core_1.EventEmitter();
        this.MessageSelected = new core_1.EventEmitter();
        this.TripSelected = new core_1.EventEmitter();
        this.query = '';
        this.countries = [];
        this.filteredList = [];
        this.showprfile = false;
        this.http.get('/api/Tripstar/Places')
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            if (result != null) {
                for (var rec in result)
                    _this.countries.push(result[rec].place);
            }
        }, function (err) { return console.log(err); });
    }
    TopNavigationComponent.prototype.Host = function () {
        if (this.tripstarservice.UserID == "" || this.tripstarservice.UserType == "User") {
            alert("Please sign in to continue hosting");
            this.router.navigate(['Login']);
        }
        else {
            this.tripstarservice.openhstID = null;
            this.router.navigate(['host']);
        }
    };
    TopNavigationComponent.prototype.checkInDate = function (val) {
        this.chkinDate = val;
        this.chkindt.emit(val);
    };
    TopNavigationComponent.prototype.checkOutDate = function (val) {
        this.chkoutDate = val;
        this.chkoutdt.emit(val);
    };
    TopNavigationComponent.prototype.checkNoGuests = function (val) {
        this.guestschanged.emit(val);
    };
    TopNavigationComponent.prototype.MessageSelection = function (val) {
        this.MessageSelected.emit(val);
    };
    TopNavigationComponent.prototype.SignupEvent = function (value) {
        if (value == 'Messages' || value == 'Trip') {
            if (this.showpopup == false) {
                this.showpopup = true;
            }
            else {
                this.showpopup = false;
            }
        }
        else {
            this.router.navigate(['Login']);
        }
    };
    TopNavigationComponent.prototype.Signuppage = function (value) {
        if (value == 'Messages') {
            if (this.showpopup == false) {
                this.showpopup = true;
            }
            else {
                this.showpopup = false;
            }
        }
        else if (value == 'Trip') {
            this.TripSelected.emit(true);
        }
        else {
            this.router.navigate(['SignUp']);
        }
    };
    TopNavigationComponent.prototype.showprofile = function () {
        if (this.showprfile) {
            this.showprfile = false;
        }
        else {
            this.showprfile = true;
        }
    };
    TopNavigationComponent.prototype.Editprofile = function () {
        this.tripstarservice.IsfromEditprofile = true;
        this.router.navigate(['SignUp']);
    };
    TopNavigationComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.countries.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
    };
    TopNavigationComponent.prototype.select = function (item) {
        this.query = item;
        //this.dashcomponent.GetselectedHosts();
        // this.tripstarservice.hstplace = item;
        this.filteredList = [];
        this.placechangeevent.emit(item);
    };
    TopNavigationComponent.prototype.onChangePlace = function (place) {
    };
    TopNavigationComponent.prototype.Logout = function () {
        this.router.navigate(['Login']);
        this.tripstarservice.Signup = "Sign Up";
        this.tripstarservice.Login = "Log In";
        this.tripstarservice.UserID = '';
        this.tripstarservice.UserType = '';
        this.tripstarservice.ShowNotifyMsg = '';
        this.tripstarservice.showMessage = [];
    };
    TopNavigationComponent.prototype.logoClick = function (item) {
        console.log("logo clicked");
        this.router.navigate(['dashboard']);
    };
    return TopNavigationComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TopNavigationComponent.prototype, "placechangeevent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TopNavigationComponent.prototype, "chkindt", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TopNavigationComponent.prototype, "chkoutdt", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TopNavigationComponent.prototype, "guestschanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TopNavigationComponent.prototype, "MessageSelected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TopNavigationComponent.prototype, "TripSelected", void 0);
TopNavigationComponent = __decorate([
    core_1.Component({
        selector: 'top-navigation',
        templateUrl: './TopNavigation.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [tripstarservice_1.tripstarservice, router_1.Router, http_1.Http])
], TopNavigationComponent);
exports.TopNavigationComponent = TopNavigationComponent;
//# sourceMappingURL=TopNavigation.js.map