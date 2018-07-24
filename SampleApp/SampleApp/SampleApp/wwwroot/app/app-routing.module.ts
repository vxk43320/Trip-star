import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';

import { HostComponent } from './Host';
import { BookingComponent } from './BookingDetail';

import { LoginComponent } from './LoginView';
import { SignUpComponent } from './SignUp';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'host', component: HostComponent },
  { path: 'booking', component: BookingComponent },

    

];

@NgModule({
    imports: [RouterModule.forRoot(routes), BrowserAnimationsModule, NoopAnimationsModule],
    exports: [RouterModule]


})
export class AppRoutingModule {}
