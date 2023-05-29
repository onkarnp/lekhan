import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  isLoggedInSubscription: Subscription = new Subscription();
  constructor(private router:Router,  private userService:UserService){ }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });
  }


  takeMeHome(){
    this.router.navigate(['home'])
  }

  takeToLogin(){
    this.router.navigate(['login'])
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
}
