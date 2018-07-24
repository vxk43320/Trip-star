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
var http_1 = require("@angular/http");
var tripstarservice_1 = require("./tripstarservice");
//import { Hero } from './hero';
//import { DataService } from './dataService';
//import {Shipment} from './models';
//import '../rxjs-extensions';
var LoginComponent = (function () {
    //headers;
    function LoginComponent(route, http, tripstarservice, /*public glbData: GlobalDataService,*/ /*public service: tripstarservice*/ router) {
        this.route = route;
        this.http = http;
        this.tripstarservice = tripstarservice;
        this.router = router;
        this.AuthMessage = '';
        this.login_username = "";
        this.login_password = "";
        this.BizBanner = 'app/Images/BizSightsideTransparent.png';
    }
    LoginComponent.prototype.LogIn = function () {
        var _this = this;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        var LogIn = { "Username": this.login_username, "Password": this.login_password };
        var data = [{ "LogIn": LogIn }];
        if (this.login_username != "" && this.login_password != "") {
            // alert("" + this.login_password);
            this.http.post('/api/Tripstar/authenticate', JSON.stringify(data), { headers: this.headers }) //added return
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                if (result != 0) {
                    _this.router.navigate(['dashboard']);
                    _this.tripstarservice.Signup = "Trip";
                    _this.tripstarservice.Login = "Messages";
                    _this.tripstarservice.UserID = result[0].userId;
                    _this.tripstarservice.UserType = result[0].usertype;
                    _this.http.post('/api/Tripstar/ShowNotification', JSON.stringify(_this.tripstarservice.UserID), { headers: _this.headers }) //added return
                        .map(function (response) { return response.json(); })
                        .subscribe(function (result) {
                        if (result != undefined) {
                            if (_this.tripstarservice.UserType == 'Host') {
                                _this.tripstarservice.ShowNotifyMsg = 'Contacted for Booking,Needs to be approved';
                                _this.tripstarservice.showMessage = result;
                            }
                            else {
                                _this.tripstarservice.ShowNotifyMsg = 'Waiting for Approval';
                            }
                        }
                    }, function (err) { return console.log(err); });
                }
                else {
                    _this.AuthMessage = "Authentication Failed";
                }
            }, function (err) { return console.log(err); });
        }
    };
    LoginComponent.prototype.RegisterForm = function () {
        this.router.navigate(['register']);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'Login-View',
        templateUrl: './LoginView.html',
        styleUrls: ['./LoginView.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.Http, tripstarservice_1.tripstarservice,
        router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=LoginView.js.map