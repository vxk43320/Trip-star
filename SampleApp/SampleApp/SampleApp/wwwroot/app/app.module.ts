//import { NgModule }      from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { FormsModule }   from '@angular/forms';
import { HttpModule, XHRBackend, Http } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HostComponent } from './Host';
import { BookingComponent } from './BookingDetail';
//import { HeroDetailComponent }  from './hero-detail.component';
import { tripstarservice } from './tripstarservice';

import { LoginComponent } from './LoginView';
import { SignUpComponent } from './SignUp';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';
import { ImageUploadModule } from 'ng2-imageupload';
import { TopNavigationComponent } from './TopNavigation';

//import { AutocompleteModule } from 'ng2-input-autocomplete';



@NgModule({

   

  imports: [
    BrowserModule,
      FormsModule, ImageUploadModule,
      HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
      AppRoutingModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
  //AutocompleteModule.forRoot()

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
     LoginComponent,
      SignUpComponent,
      HostComponent,
      BookingComponent,
      TopNavigationComponent
  ],
  providers: [tripstarservice, HttpModule, XHRBackend ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
