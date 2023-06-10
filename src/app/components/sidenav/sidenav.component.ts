import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy{
  usertypes: any;
  selectedMenu = 0;
  showNestedList = false;
  isLoggedIn: boolean = false;
  userDetails: any = null;
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();

  constructor(private formBuilder:FormBuilder, private userService:UserService ,private http:HttpClient, private router:Router){}
  ngOnInit(): void{

    // this.userService.checkIfLoggedIn();
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
      if(this.isLoggedIn)
        this.selectedMenu = this.userDetails.usertypeid;
      else
        this.selectedMenu = 0;
    });

    // this.userService.isLoggedIn.subscribe(value => {
    //   this.isLoggedIn = value;
    //   console.log(this.isLoggedIn);

    // });

    // this.userService.userDetails.subscribe(value => {
    //   this.userDetails = value;
    //   console.log(this.userDetails);

    // });

    //To get all usertyes
    this.userService.getUsertypes().subscribe((results) => {
      // console.log("usertypes", results);
      this.usertypes = results;
    },(errors) => {
      console.log(errors);
    });

    // this.userService.checkIfLoggedIn();
  }


  setLoggedIn(value: boolean) {
    this.userService.setLoggedIn(value);
  }

  setUserDetails(value: any) {
    this.userService.setUserDetails(value);
  }

  toHome(){
    console.log(this.isLoggedIn);
    console.log(this.userDetails);
    this.router.navigate(['/home']);
  }

  logout() {
    // perform logout logic
    this.userService.setLoggedIn(false);
    this.userService.setUserDetails(null);
  }

  toggleNestedList():void {
    this.showNestedList = !this.showNestedList;
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }

}
