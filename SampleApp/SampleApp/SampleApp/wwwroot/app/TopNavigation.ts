import { Component, Output, Input,EventEmitter } from '@angular/core';
import { tripstarservice } from './tripstarservice';
import { Http, Headers, Response } from '@angular/http';
//import { DashboardComponent } from './dashboard.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'top-navigation',
    templateUrl: './TopNavigation.html',
    styleUrls: ['./app.component.css']
})
export class TopNavigationComponent {
    title = 'TripStar';
    Signup = "Sign Up";
    Login = "Log In";
    place = "";
    showpopup = false;
    chkinDate = '';//new Date();
    chkoutDate = '';//new Date();
    @Output() placechangeevent = new EventEmitter<string>();
    @Output() chkindt = new EventEmitter<string>();
    @Output() chkoutdt = new EventEmitter<string>();
    @Output() guestschanged = new EventEmitter<string>();
    @Output() MessageSelected = new EventEmitter<string>();
    @Output() TripSelected = new EventEmitter<boolean>();
    Guests: any;
    public query = '';
    public countries: any = [];
    public filteredList: any = [];
    public elementRef: any;
    constructor(private tripstarservice: tripstarservice, private router: Router, public http: Http) {
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
    }
    Host() {
        if (this.tripstarservice.UserID == "" || this.tripstarservice.UserType == "User") {
            alert("Please sign in to continue hosting");
            this.router.navigate(['Login']);
        }
        else {
            this.tripstarservice.openhstID = null;
            this.router.navigate(['host']);
        }
    }

    checkInDate(val:any)
    {
        this.chkinDate = val;
        this.chkindt.emit(val);
    }
    checkOutDate(val: any)
    {
        this.chkoutDate = val;
        this.chkoutdt.emit(val);
    }
    checkNoGuests(val: any)
    {
        this.guestschanged.emit(val);
    }
    MessageSelection(val: any)
    {
        this.MessageSelected.emit(val);
    }
    SignupEvent(value: any)
    {
        if (value == 'Messages' || value=='Trip')
        {
            if (this.showpopup == false)
            {
                this.showpopup = true;
            }
            else
            {
                this.showpopup = false;
            }
            
        }
        else
        {
            this.router.navigate(['Login']);
        }

    }


    Signuppage(value: any) {
        if (value == 'Messages') {
            if (this.showpopup == false) {
                this.showpopup = true;
            }
            else {
                this.showpopup = false;
            }

        }
        else if (value == 'Trip')
        {
            this.TripSelected.emit(true);
        }
        else {
            this.router.navigate(['SignUp']);
        }

    }
    showprfile = false;
    showprofile()
    {
        if (this.showprfile)
        {
            this.showprfile = false;
        }
        else
        {
            this.showprfile = true;
        }
    }

    Editprofile()
    {
        this.tripstarservice.IsfromEditprofile = true;
        this.router.navigate(['SignUp']);
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
        //this.dashcomponent.GetselectedHosts();
        // this.tripstarservice.hstplace = item;
        this.filteredList = [];
        this.placechangeevent.emit(item);
    }


    onChangePlace(place: string) {
       
    }
    Logout()
    {
        this.router.navigate(['Login']);
        this.tripstarservice.Signup = "Sign Up";
        this.tripstarservice.Login = "Log In";
        this.tripstarservice.UserID = ''; this.tripstarservice.UserType = ''; this.tripstarservice.ShowNotifyMsg = '';
        this.tripstarservice.showMessage=[];
    }

    logoClick(item: any) {
        console.log("logo clicked");
        this.router.navigate(['dashboard']);
    }
}
