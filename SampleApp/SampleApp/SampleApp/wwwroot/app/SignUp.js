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
require("./rxjs-extensions");
var SignUpComponent = (function () {
    //headers;
    function SignUpComponent(route, http, tripstarservice, /*public glbData: GlobalDataService,*/ /*public service: tripstarservice*/ router) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.tripstarservice = tripstarservice;
        this.router = router;
        this.UserType = 'User';
        this.isedit = false;
        this.discontinued = "";
        this.login_username = "";
        this.login_password = "";
        if (this.tripstarservice.UserID != null && this.tripstarservice.IsfromEditprofile == true) {
            // var data = [{ "UserHeader": this.UserHeader }];
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/EditUser', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                var edituser = result;
                _this.isedit = true;
                // this.login_username = edituser.;
                _this.login_Remarks = edituser[0].Remarks;
                //this.login_Confirmpaasword = edituser[0].Password;
                _this.login_password = edituser[0].Password;
                _this.login_address = edituser[0].Address;
                _this.login_prefercurrency = edituser[0].PreferredCurrency;
                _this.login_preferLanguage = edituser[0].PreferredLanguage;
                _this.login_EmailID = edituser[0].EmailId;
                _this.login_dob = edituser[0].Dob;
                _this.login_lastname = edituser[0].LastName;
                _this.login_firstname = edituser[0].FirstName;
                _this.login_phone = edituser[0].Phone;
                _this.login_UserType = edituser[0].usertype;
                _this.tripstarservice.IsfromEditprofile = false;
            }, function (err) { return console.log(err); });
        }
    }
    SignUpComponent.prototype.onChangeuser = function (userValue) {
        console.log(userValue);
        this.UserType = userValue;
    };
    SignUpComponent.prototype.onChangelanguage = function (userValue1) {
        this.login_preferLanguage = userValue1;
    };
    SignUpComponent.prototype.onChangecurrency = function (userValue2) {
        this.login_prefercurrency = userValue2;
    };
    SignUpComponent.prototype.Saveuserdtls = function () {
        var _this = this;
        // UserHeader
        if (this.login_firstname != "" && this.login_firstname != "" && this.login_EmailID != "" && this.login_EmailID != null) {
            this.UserHeader = {
                "login_Remarks": this.login_Remarks, "login_password": this.login_password, "login_address": this.login_address,
                "login_prefercurrency": this.login_prefercurrency,
                "login_preferLanguage": this.login_preferLanguage, "login_EmailID": this.login_EmailID, "login_dob": "",
                "login_lastname": this.login_lastname,
                "login_firstname": this.login_firstname, "login_phone": this.login_phone, "UserType": this.UserType
            };
            var data = [{ "UserHeader": this.UserHeader }];
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/PostUser', JSON.stringify(data), { headers: this.headers })
                .map(function (response) { return response.json(); })
                .subscribe(function (result) {
                if (result == true) {
                    _this.router.navigate(['dashboard']);
                }
            }, function (err) { return console.log(err); });
        }
        else {
            //if (this.login_firstname=="")
            this.discontinued = "Please enter first name and last name ";
            if (this.login_EmailID == "") {
                this.discontinued = "please enter Email. ";
            }
        }
    };
    return SignUpComponent;
}());
SignUpComponent = __decorate([
    core_1.Component({
        selector: 'Sign-Up',
        templateUrl: './SignUp.html',
        styleUrls: ['./SignUp.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.Http, tripstarservice_1.tripstarservice,
        router_1.Router])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=SignUp.js.map