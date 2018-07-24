/// <reference path="app-routing.module.ts" />
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { tripstarservice } from './tripstarservice';
import { AppComponent } from './app.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ResizeOptions, ImageResult } from "ng2-imageupload";
import './rxjs-extensions';
@Component({
    selector: 'host',
    templateUrl: './BookingDetail.html',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    styleUrls: ['./SignUp.css']

})
export class BookingComponent {
    headers: any; 
    booking_CheckIn: any = '';
    booking_CheckOut: any = '';
    booking_Noofguests: any = '';
    user: any = '';
    
    constructor(
        public route: ActivatedRoute, public http: Http, private tripstarservice: tripstarservice,
        public router: Router, public appCompnt: AppComponent
    ) {


        if (this.tripstarservice.bookingID != null)
        {
           
            this.headers = new Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/OpenBookingbyID', JSON.stringify(this.tripstarservice.bookingID), { headers: this.headers })
                .map(response => response.json())
                .subscribe(result => {
                    this.booking_CheckIn = result[0].CheckIn;
                    this.booking_CheckOut = result[0].CheckOut;
                    this.booking_Noofguests = result[0].NoUsers;
                    this.user = result[0].User;

                },
                err => console.log(err)
                );
        }

    }

    Back()
    {
        this.router.navigate(['dashboard']);
    }
    
   
    }
