import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import User from '../model/user'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { Emitters } from '../shared/emitters';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3000/api/v1/cms"
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
  };

  constructor(private http:HttpClient, private router:Router, private toastr: ToastrService) { }

  setLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  setUserDetails(value: any) {
    this.userDetails.next(value);
  }


  //To get usertypes available
  getUsertypes(){
    return this.http.get(this.url + '/usertypes');
  }


  //To add user onto users table
  signUp(userDetails: User){
    console.log(userDetails);
    this.http.post(this.url + '/users', userDetails, this.httpOptions).subscribe((results)=> {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.toastr.success(jsObj.message, 'Success');
        this.router.navigate(['/login']);
      }
      else{
        this.toastr.error(jsObj.message, 'Error')
      }
    }, (error) => {
      console.log(error);
      this.toastr.error(error.error.message, 'Failed')
    });
  }

  //To login to the application
  login(data:any){
    this.http.post(this.url + "/login", data, this.httpOptions).subscribe((results)=> {
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.setLoggedIn(true);
        this.setUserDetails(jsObj.data);
        this.toastr.success(jsObj.message, 'Success');
        this.router.navigate(['/home'])
      }
      else{
        this.setLoggedIn(false);
        this.setUserDetails(null);
        this.toastr.error(jsObj.message, 'Failed')
      }
    }, (err) => {
      this.setLoggedIn(false);
      this.setUserDetails(null);
      console.log(err);
      this.toastr.error(err.error.message, 'Error')
    })
  }

  checkCookieExists(cookieName: string): boolean {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(cookieName + '=')) {
        return true;
      }
    }
    return false;
  }

  checkIfLoggedIn(){
    if(!this.checkCookieExists('cmscookie'))
      return;
    try{
      this.http.get(this.url + "/user", this.httpOptions).subscribe((results) => {
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        console.log(jsObj);
        if(jsObj.success){
          this.setLoggedIn(true);
          this.setUserDetails(jsObj.data);
          return true;
          // this.toastr.success(jsObj.message,'Success')
        }
        else{
          this.setLoggedIn(false);
          this.setUserDetails(null);
          return false;
        }
      }, (err) => {
        console.log(err);
        this.setLoggedIn(false);
        this.setUserDetails(null);
        return false;
        // this.toastr.info('Please login to the application','Info')
      })
      }
    catch(e){
      console.log(e);
    }
  }
}
