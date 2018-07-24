import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { tripstarservice } from './tripstarservice';

//import { Hero } from './hero';
//import { DataService } from './dataService';
//import {Shipment} from './models';
import './rxjs-extensions';
@Component({
    selector: 'Sign-Up',
    templateUrl: './SignUp.html',
    styleUrls: ['./SignUp.css']
    
})
export class SignUpComponent {
    public login_username: string;
    //public login_password: string;
    public BizBanner: string;
    login_Remarks: any;
    login_Confirmpaasword: any;
    login_password: any;
    login_address: any;
    login_prefercurrency: any;
    login_preferLanguage: any;
    login_EmailID: any;
    login_dob: any;
    login_lastname: any;
    login_firstname: any;
    login_phone: any;
    login_UserType: any;
    UserType: any='User';
    Login: string;
    Signup: string;
    UserHeader: any;
    headers: any;
    language: any;
    currency: any;
    isedit = false;
    discontinued = "";
    //headers;
    constructor(
        public route: ActivatedRoute, public http: Http, private tripstarservice: tripstarservice, /*public glbData: GlobalDataService,*/ /*public service: tripstarservice*/
        public router: Router
    ) {

        this.login_username = "";
        this.login_password = "";
        if (this.tripstarservice.UserID != null && this.tripstarservice.IsfromEditprofile == true)
        {

           

          // var data = [{ "UserHeader": this.UserHeader }];
            this.headers = new Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/EditUser', JSON.stringify(this.tripstarservice.UserID), { headers: this.headers })
                .map(response => response.json())
                .subscribe(result => {
                    var edituser = result;
                    this.isedit = true;

                   // this.login_username = edituser.;
   
  
                    this.login_Remarks = edituser[0].Remarks;
                    //this.login_Confirmpaasword = edituser[0].Password;
                    this.login_password = edituser[0].Password;
                    this.login_address = edituser[0].Address;
                    this.login_prefercurrency = edituser[0].PreferredCurrency;
                    this.login_preferLanguage = edituser[0].PreferredLanguage;
                    this.login_EmailID = edituser[0].EmailId;
                    this.login_dob = edituser[0].Dob;
                    this.login_lastname = edituser[0].LastName;
                    this.login_firstname = edituser[0].FirstName;
                    this.login_phone = edituser[0].Phone;
                    this.login_UserType = edituser[0].usertype;

                    this.tripstarservice.IsfromEditprofile = false;
                },
                err => console.log(err)
                );
            
        }
    }
    onChangeuser(userValue: any) {
        console.log(userValue);
        this.UserType = userValue;
    }
    onChangelanguage(userValue1: any) {
        this.login_preferLanguage = userValue1;
    }
    onChangecurrency(userValue2: any) {
        this.login_prefercurrency = userValue2;
    }
    Saveuserdtls() {
        // UserHeader
        if (this.login_firstname != "" && this.login_firstname != "" && this.login_EmailID != "" && this.login_EmailID != null) {


            this.UserHeader = {

                "login_Remarks": this.login_Remarks, "login_password": this.login_password, "login_address": this.login_address,
                "login_prefercurrency": this.login_prefercurrency,
                "login_preferLanguage": this.login_preferLanguage, "login_EmailID": this.login_EmailID, "login_dob": "",
                "login_lastname": this.login_lastname,
                "login_firstname": this.login_firstname, "login_phone": this.login_phone, "UserType": this.UserType
            }

            var data = [{ "UserHeader": this.UserHeader }];
            this.headers = new Headers();
            this.headers.append('Content-Type', 'application/json');
            this.http.post('/api/Tripstar/PostUser', JSON.stringify(data), { headers: this.headers })
                .map(response => response.json())
                .subscribe(result => {
                    if (result == true) {
                        this.router.navigate(['dashboard']);
                    }
                },
                err => console.log(err)
                );
        }
        else
        {
            //if (this.login_firstname=="")
                this.discontinued = "Please enter first name and last name "
          if (this.login_EmailID == "")
            {
                this.discontinued = "please enter Email. "
            }
        }
    }
}