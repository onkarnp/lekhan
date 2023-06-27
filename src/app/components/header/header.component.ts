import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Emitters } from 'src/app/shared/emitters';
import { UserService } from '../../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  sidebarOpen:boolean = true;
  isLoggedIn: boolean = false;
  userDetails: any = null;
  userName:string = 'Username';
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter;
  constructor( private userService:UserService ,private http:HttpClient, private router:Router, private cookieService: CookieService){}
  ngOnInit(): void {
    // this.userService.checkIfLoggedIn();
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
      if(this.isLoggedIn)
        this.userName = this.userDetails.username;
      // else
      //   this.userName = "UserName";
    });
  }


  toggleSidebar(){
    this.toggleSidebarForMe.emit();
    this.sidebarOpen = !this.sidebarOpen;
  }

  setLoggedIn(value: boolean) {
    this.userService.setLoggedIn(value);
  }

  setUserDetails(value: any) {
    this.userService.setUserDetails(value);
  }

 logout(){

  Swal.fire({
    title: 'Are you sure?',
    // text: "The changes will be lost if not saved!",
    icon: 'warning',
    position: 'top-end',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out!'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.userService.logout();
    // console.log(document.cookie);
    // this.cookieService.delete('cmscookie');
    // document.cookie = "cmscookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // console.log(document.cookie);
    // this.userService.setLoggedIn(false);
    // this.userService.setUserDetails(null);
    // this.router.navigate(['/home']);
      // Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      // Swal.fire('Changes are not saved', '', 'info')
    }
  })

  }


  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }

}
