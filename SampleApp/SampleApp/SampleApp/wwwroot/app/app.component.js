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
var AppComponent = (function () {
    function AppComponent(tripstarservice, router, http) {
        var _this = this;
        this.tripstarservice = tripstarservice;
        this.router = router;
        this.http = http;
        this.title = 'Airbnb';
        this.Signup = "Sign Up";
        this.Login = "Log In";
        this.place = "";
        this.chkinDate = new Date();
        this.chkoutDate = new Date();
        this.Guests = 1;
        this.query = '';
        this.countries = [];
        this.filteredList = [];
        this.http.get('/api/Tripstar/Places')
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            if (result != null) {
                for (var rec in result)
                    _this.countries.push(result[rec].place);
            }
        }, function (err) { return console.log(err); });
    }
    AppComponent.prototype.Host = function () {
        if (this.tripstarservice.UserID == "") {
            alert("Please sign in to continue hosting");
            this.router.navigate(['Login']);
        }
        else {
            this.router.navigate(['host']);
        }
    };
    AppComponent.prototype.onChangePlace = function (place) {
        this.place = place;
    };
    AppComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.countries.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
    };
    AppComponent.prototype.select = function (item) {
        this.query = item;
        //this.dashcomponent.GetselectedHosts();
        // this.tripstarservice.hstplace = item;
        this.filteredList = [];
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [tripstarservice_1.tripstarservice, router_1.Router, http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map