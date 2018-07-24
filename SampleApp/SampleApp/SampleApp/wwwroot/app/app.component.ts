import { Component } from '@angular/core';
import { tripstarservice } from './tripstarservice';
import { Http, Headers, Response } from '@angular/http';
//import { DashboardComponent } from './dashboard.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Airbnb';
    Signup = "Sign Up";
    Login = "Log In";
    place = "";
    chkinDate = new Date();
    chkoutDate = new Date();
    Guests: any=1;
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
    Host()
    {
        if (this.tripstarservice.UserID == "")
        {
            alert("Please sign in to continue hosting");
            this.router.navigate(['Login']);
        }
        else
        {
            this.router.navigate(['host']);
        }
    }
    onChangePlace(place: any) {
        this.place = place;
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
    }
   
}
