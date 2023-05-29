import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './service/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'AngularApp';
  sideBarOpen = true;
  isLoggedIn: boolean = false;
  userDetails: any = null;
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  constructor(private userService:UserService ,private http:HttpClient, private toastr: ToastrService){}
  ngOnInit(): void {
    this.userService.checkIfLoggedIn();
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
    });


    // checkIfLoggedIn(){
    //   this.http.get(this.url + "/user",this.httpOptions).subscribe((results) => {
    //     var resultString=JSON.stringify(results);
    //     var jsObj = JSON.parse(resultString);
    //     console.log("jsObj", jsObj);
    //     return jsObj;
    //   }, (err) => {
    //     console.log(err);
    //     this.toastr.info('Please login to the application','Info')
    //     return err.error;
    //   })
    // }



    // console.log(document.cookie);
    // if(document.cookie !=""){
    //   this.isLoggedIn = this.userService.checkIfLoggedIn();
    // console.log(this.isLoggedIn);
    // }

  }

  setLoggedIn(value: boolean) {
    this.userService.setLoggedIn(value);
  }

  setUserDetails(value: any) {
    this.userService.setUserDetails(value);
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }
}
