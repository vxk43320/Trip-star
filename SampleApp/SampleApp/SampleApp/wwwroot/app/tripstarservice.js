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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var tripstarservice = (function () {
    function tripstarservice(http) {
        this.http = http;
        this.Signup = "Sign Up";
        this.Login = "Log In";
        this.UserID = '';
        this.UserType = '';
        this.ShowNotifyMsg = '';
        this.showMessage = [];
        this.bookingID = '';
        this.bookingstatu = '';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.heroesUrl = 'api/heroes'; // URL to web api
        this.IsfromEditprofile = false;
    }
    tripstarservice.prototype.getHeroes = function () {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    tripstarservice.prototype.getHeroes1 = function () {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    tripstarservice.prototype.getHeroes2 = function () {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    tripstarservice.prototype.getHero = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    tripstarservice.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    tripstarservice.prototype.create = function (name) {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    tripstarservice.prototype.update = function (hero) {
        var url = this.heroesUrl + "/" + hero.id;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    tripstarservice.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    //new changes
    tripstarservice.prototype.getHostsById = function (hostId) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/Tripstar/GetBookingsByHost', JSON.stringify(hostId), { headers: headers })
            .map(function (response) { return response.json(); });
    };
    tripstarservice.prototype.getBlockingById = function (hostId) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/Tripstar/GetBlockingByHost', JSON.stringify(hostId), { headers: headers })
            .map(function (response) { return response.json(); });
    };
    tripstarservice.prototype.deleteBooking = function (bookingId) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('/api/Tripstar/deleteBooking', JSON.stringify(bookingId), { headers: headers })
            .map(function (response) { return response.json(); }).subscribe(function (result) { return result; });
    };
    return tripstarservice;
}());
tripstarservice = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], tripstarservice);
exports.tripstarservice = tripstarservice;
//# sourceMappingURL=tripstarservice.js.map