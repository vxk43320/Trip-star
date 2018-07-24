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
    templateUrl: './Host.html',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    styleUrls: ['./SignUp.css']

})
export class HostComponent {
    headers: any; ItemImage: any = null; ImageAddnew: any;
    public query = '';
    public countries: any = [];
    public filteredList: any = [];
    public elementRef: any;
    public openhst: any = [];
    openhost: boolean = false;
    openfromlist: boolean = false;
    hostId: any = null;
    userid: any = null;
    review: boolean = false;
    //constructor(myElement: ElementRef) {
    //    this.elementRef = myElement;
    //}
    constructor(
        public route: ActivatedRoute, public http: Http, private tripstarservice: tripstarservice, myElement: ElementRef, public _DomSanitizationService: DomSanitizer,
        public router: Router, public appCompnt: AppComponent
    ) {

        this.http.get('/api/Tripstar/Places')
            .map(response => response.json())
            .subscribe(result => {
                if (result != null) {
                    for (var rec in result)
                        this.countries.push(result[rec].place);
                }
            },
            err => console.log(err)
            );


   
        if (this.tripstarservice.openhstID != null)
        {
            this.openhost = true;
            this.headers = new Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/OpenhstByHostID', JSON.stringify(this.tripstarservice.openhstID), { headers: this.headers })
                .map(response => response.json())
                .subscribe(result => {
                    //{
                    this.openhst = result;
                   
                   // this.host_Photo = result[0].HostId;

                    this.host_Roomtype = result[0].Roomtype;
                    this.host_Price = result[0].Place;
                    this.query = result[0].Place;
                    this.openfromlist = true;
                    this.host_Description = result[0].Description;
                    this.rvews = result[0].Reviews;
                    //this.hst = result[0].User;
                    this.host_Price = result[0].Price;
                    this.hostId = result[0].hostid;
                    this.userid = this.tripstarservice.UserID;
                    this.host_Review = result[0].Review;
                   // this.host_Photo = result[0].Photo;
                    var itemimag = result[0].Photo;
                    if (itemimag != "" && itemimag != null) {
                        this.src=_DomSanitizationService.bypassSecurityTrustUrl(itemimag);

                    }
                    else {
                        this.src=null;
                    }
                    //this.Getsselectedhst = result;
                  
                    //}
                },
                err => console.log(err)
                );
        }

    }

    Back()
    {
        this.router.navigate(['dashboard']);
    }
    showReviews=false;
    ShowReviews()
    {
        if(this.showReviews)
        {
            this.showReviews=false;
        }
        else
        {
            this.showReviews=true;
        }
        // new changes
        console.log(this.hostId);
        this.tripstarservice.getHostsById(this.hostId).subscribe(result => {
            console.log(result);
            for (let row of result) {
                if (row.UserID == this.userid) {
                    this.review = true;
                    break;
                }
            }

            console.log(this.review);
        });
        //
    }
    filter() {
        if (this.query !== "") {
            this.filteredList = this.countries.filter(function (el: any) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item: any) {
        this.query = item;
       
        this.filteredList = [];
    }
    handleClick(event: any) {
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
    }
    src: any;
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 128,
        resizeMaxWidth: 128
    };

    selected(imageResult: ImageResult) {
        this.ItemImage = "";
        this.ImageAddnew = false;
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    }
    HostHeader: any;
    host_UserID: any;
    host_Roomtype: any = 'Single';
    host_type: any = 'Home';
   host_Description: any;
   rvews: any;
host_Photo: any;
host_Price: any;
host_Place: any;
host_Review: any='';
    onChangeRoomtype(newObj: any) {
    console.log(newObj);
    this.host_Roomtype = newObj;
    
}
    onChangePlace(place: any)
    {
        this.host_Place = place;
    }

    





    onChange(deviceValue: any) {
        this.host_Roomtype = deviceValue;
    }
    showrumtype = false;
    onChange1(val: any) {
        if (val == "Home")
        {
            this.showrumtype = true;
        }
        else
        {
            this.showrumtype = false;
        }
        this.host_type = val;
       // this.host_Roomtype = deviceValue;
    }
    Savehostdtls() {
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
           }

        var data = [{ "hostHeader": this.HostHeader }];
            this.headers = new Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/PostHost', JSON.stringify(data), { headers: this.headers })
                .map(response => response.json())
                .subscribe(result => {
                    if (result == true) {
                        this.router.navigate(['dashboard']);
                    }
                },
                err => console.log(err)
                );
    }


    SaveReviews()
    {
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
        }

        var data = [{ "hostHeader": this.HostHeader }];
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.http.post('/api/Tripstar/PostReview', JSON.stringify(data), { headers: this.headers })
            .map(response => response.json())
            .subscribe(result => {
                if (result == true) {
                   this.router.navigate(['dashboard']);
                }
            },
            err => console.log(err)
            );
    }
    }
