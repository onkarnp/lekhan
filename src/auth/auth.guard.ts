import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit, OnDestroy{
  isLoggedIn: boolean = false;
  userDetails: any = null;
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();

  constructor(private userService:UserService, private router:Router){}

  ngOnInit(): void {
      // this.userService.checkIfLoggedIn()
      // this.userService.checkIfLoggedIn();
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this.userService.checkIfLoggedIn();

    // const isLoggedIn:boolean = this.userService.getLoggedIn();
    // const userDetails:object = this.userService.getUserDetails();
    console.log(this.isLoggedIn);
    console.log(this.userDetails);
    if(this.userDetails){
      // console.log(next.data.allowedUserTypes);

      if(next.data.allowedUserTypes.includes(this.userDetails.usertypeid)){
        console.log('allowed');
      }
      else{
        this.router.navigate(['/unauthorized']);
      }
    }
    return true;
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }
}
