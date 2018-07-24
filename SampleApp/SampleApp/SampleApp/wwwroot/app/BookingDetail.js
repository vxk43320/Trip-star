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
/// <reference path="app-routing.module.ts" />
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var tripstarservice_1 = require("./tripstarservice");
var app_component_1 = require("./app.component");
require("./rxjs-extensions");
var BookingComponent = (function () {
    function BookingComponent(route, http, tripstarservice, router, appCompnt) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.tripstarservice = tripstarservice;
        this.router = router;
        this.appCompnt = appCompnt;
        this.booking_CheckIn = '';
        this.booking_CheckOut = '';
        this.booking_Noofguests = '';
        this.user = '';
        if (this.tripstarservice.bookingID != null) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/OpenBookingbyID', JSON.stringify(this.tripstarservice.bookingID), { headers: this.headers })
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                _this.booking_CheckIn = result[0].CheckIn;
                _this.booking_CheckOut = result[0].CheckOut;
                _this.booking_Noofguests = result[0].NoUsers;
                _this.user = result[0].User;
            }, function (err) { return console.log(err); });
        }
    }
    BookingComponent.prototype.Back = function () {
        this.router.navigate(['dashboard']);
    };
    return BookingComponent;
}());
BookingComponent = __decorate([
    core_1.Component({
        selector: 'host',
        templateUrl: './BookingDetail.html',
        host: {
            '(document:click)': 'handleClick($event)',
        },
        styleUrls: ['./SignUp.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.Http, tripstarservice_1.tripstarservice,
        router_1.Router, app_component_1.AppComponent])
], BookingComponent);
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=BookingDetail.js.map