import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component'
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'

const appRoute: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component:HomepageComponent},
  {path: 'About', component:HomepageComponent},
  {path: 'Contact', component:HomepageComponent},
  {path: 'Signup', component:SignupComponent},
  {path: 'Login', component:LoginComponent},
  //The error route must be last route
  {path: '**', component:ErrorComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    ErrorComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
