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
var platform_browser_1 = require("@angular/platform-browser");
require("./rxjs-extensions");
var HostComponent = (function () {
    //constructor(myElement: ElementRef) {
    //    this.elementRef = myElement;
    //}
    function HostComponent(route, http, tripstarservice, myElement, _DomSanitizationService, router, appCompnt) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.tripstarservice = tripstarservice;
        this._DomSanitizationService = _DomSanitizationService;
        this.router = router;
        this.appCompnt = appCompnt;
        this.ItemImage = null;
        this.query = '';
        this.countries = [];
        this.filteredList = [];
        this.openhst = [];
        this.openhost = false;
        this.openfromlist = false;
        this.hostId = null;
        this.userid = null;
        this.review = false;
        this.showReviews = false;
        this.resizeOptions = {
            resizeMaxHeight: 128,
            resizeMaxWidth: 128
        };
        this.host_Roomtype = 'Single';
        this.host_type = 'Home';
        this.host_Review = '';
        this.showrumtype = false;
        this.http.get('/api/Tripstar/Places')
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            if (result != null) {
                for (var rec in result)
                    _this.countries.push(result[rec].place);
            }
        }, function (err) { return console.log(err); });
        if (this.tripstarservice.openhstID != null) {
            this.openhost = true;
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/OpenhstByHostID', JSON.stringify(this.tripstarservice.openhstID), { headers: this.headers })
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                //{
                _this.openhst = result;
                // this.host_Photo = result[0].HostId;
                _this.host_Roomtype = result[0].Roomtype;
                _this.host_Price = result[0].Place;
                _this.query = result[0].Place;
                _this.openfromlist = true;
                _this.host_Description = result[0].Description;
                _this.rvews = result[0].Reviews;
                //this.hst = result[0].User;
                _this.host_Price = result[0].Price;
                _this.hostId = result[0].hostid;
                _this.userid = _this.tripstarservice.UserID;
                _this.host_Review = result[0].Review;
                // this.host_Photo = result[0].Photo;
                var itemimag = result[0].Photo;
                if (itemimag != "" && itemimag != null) {
                    _this.src = _DomSanitizationService.bypassSecurityTrustUrl(itemimag);
                }
                else {
                    _this.src = null;
                }
                //this.Getsselectedhst = result;
                //}
            }, function (err) { return console.log(err); });
        }
    }
    HostComponent.prototype.Back = function () {
        this.router.navigate(['dashboard']);
    };
    HostComponent.prototype.ShowReviews = function () {
        var _this = this;
        if (this.showReviews) {
            this.showReviews = false;
        }
        else {
            this.showReviews = true;
        }
        // new changes
        console.log(this.hostId);
        this.tripstarservice.getHostsById(this.hostId).subscribe(function (result) {
            console.log(result);
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var row = result_1[_i];
                if (row.UserID == _this.userid) {
                    _this.review = true;
                    break;
                }
            }
            console.log(_this.review);
        });
        //
    };
    HostComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.countries.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
    };
    HostComponent.prototype.select = function (item) {
        this.query = item;
        this.filteredList = [];
    };
    HostComponent.prototype.handleClick = function (event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    };
    HostComponent.prototype.selected = function (imageResult) {
        this.ItemImage = "";
        this.ImageAddnew = false;
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    };
    HostComponent.prototype.onChangeRoomtype = function (newObj) {
        console.log(newObj);
        this.host_Roomtype = newObj;
    };
    HostComponent.prototype.onChangePlace = function (place) {
        this.host_Place = place;
    };
    HostComponent.prototype.onChange = function (deviceValue) {
        this.host_Roomtype = deviceValue;
    };
    HostComponent.prototype.onChange1 = function (val) {
        if (val == "Home") {
            this.showrumtype = true;
        }
        else {
            this.showrumtype = false;
        }
        this.host_type = val;
        // this.host_Roomtype = deviceValue;
    };
    HostComponent.prototype.Savehostdtls = function () {
        var _this = this;
        // UserHeader
        this.HostHeader = {
            "UserID": this.tripstarservice.UserID,
            //"PlaceID":
            "HostID": this.hostId,
            "Roomtype": this.host_Roomtype,
            "Description": this.host_Description,
            "photo": this.src,
            "Price": this.host_Price,
            "Place": this.query,
            "Review": this.host_Review,
            "Type": this.host_type
        };
        var data = [{ "hostHeader": this.HostHeader }];
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.http.post('/api/Tripstar/PostHost', JSON.stringify(data), { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            if (result == true) {
                _this.router.navigate(['dashboard']);
            }
        }, function (err) { return console.log(err); });
    };
    HostComponent.prototype.SaveReviews = function () {
        var _this = this;
        this.HostHeader = {
            "UserID": this.tripstarservice.UserID,
            //"PlaceID":
            "HostID": this.hostId,
            "Roomtype": this.host_Roomtype,
            "Description": this.host_Description,
            "photo": null,
            "Price": this.host_Price,
            "Place": this.query,
            "Review": this.host_Review
        };
        var data = [{ "hostHeader": this.HostHeader }];
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.http.post('/api/Tripstar/PostReview', JSON.stringify(data), { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            if (result == true) {
                _this.router.navigate(['dashboard']);
            }
        }, function (err) { return console.log(err); });
    };
    return HostComponent;
}());
HostComponent = __decorate([
    core_1.Component({
        selector: 'host',
        templateUrl: './Host.html',
        host: {
            '(document:click)': 'handleClick($event)',
        },
        styleUrls: ['./SignUp.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.Http, tripstarservice_1.tripstarservice, core_1.ElementRef, platform_browser_1.DomSanitizer,
        router_1.Router, app_component_1.AppComponent])
], HostComponent);
exports.HostComponent = HostComponent;
//# sourceMappingURL=Host.js.map