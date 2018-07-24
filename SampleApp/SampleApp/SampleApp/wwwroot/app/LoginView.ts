import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { tripstarservice } from './tripstarservice';

//import { Hero } from './hero';
//import { DataService } from './dataService';
//import {Shipment} from './models';
//import '../rxjs-extensions';
@Component({
    selector: 'Login-View',
    templateUrl: './LoginView.html',
    styleUrls: ['./LoginView.css']
})
export class LoginComponent {
    public login_username: string;
    public login_password: string;
    public BizBanner: string;
    Login: string;
    Signup: string;
    headers: any;
    AuthMessage: any = '';
    //headers;
    constructor(
        public route: ActivatedRoute, public http: Http, private tripstarservice: tripstarservice, /*public glbData: GlobalDataService,*/ /*public service: tripstarservice*/
        public router: Router
    ) {

        this.login_username = "";
        this.login_password = "";
        this.BizBanner = 'app/Images/BizSightsideTransparent.png';
    }
    LogIn() {
      
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        var LogIn = { "Username": this.login_username, "Password": this.login_password };
        var data = [{ "LogIn": LogIn }];
       
        if (this.login_username != "" && this.login_password != "") {
           // alert("" + this.login_password);
            this.http.post('/api/Tripstar/authenticate', JSON.stringify(data), { headers: this.headers })      //added return
                .map(response => response.json())
                .subscribe(result => {


                    if (result != 0) {

                        this.router.navigate(['dashboard']);
                        this.tripstarservice.Signup = "Trip";
                        this.tripstarservice.Login = "Messages";
                        this.tripstarservice.UserID = result[0].userId;
                        this.tripstarservice.UserType = result[0].usertype;
                        this.http.post('/api/Tripstar/ShowNotification', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })      //added return
                            .map(response => response.json())
                            .subscribe(result => {
                                if (result != undefined)
                                {
                                    if(this.tripstarservice.UserType == 'Host')
                                    {
                                        this.tripstarservice.ShowNotifyMsg = 'Contacted for Booking,Needs to be approved';
                                        this.tripstarservice.showMessage = result;
                                    }               
                                    else
                                    {
                                        this.tripstarservice.ShowNotifyMsg = 'Waiting for Approval';
                                    }
                                    
                                }


                            },
                            err => console.log(err)
                            );
                    }
                    else
                    {
                        this.AuthMessage = "Authentication Failed";
                    }
                },
                err => console.log(err)
                );
        }
    }
    RegisterForm() {
        this.router.navigate(['register']);
    }
}