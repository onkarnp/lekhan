import { Injectable, OnInit } from '@angular/core';
// import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import User from '../model/user'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  ngOnInit(): void{
    // this.checkIfLoggedIn();
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  setUserDetails(value: any) {
    this.userDetails.next(value);
  }

  getLoggedIn():boolean{
    return this.isLoggedIn.getValue();
  }

  getUserDetails():object{
    return this.userDetails.getValue();
  }


  //To get usertypes available
  getUsertypes(): Observable<any>{
    return this.http.get(this.url + '/usertypes');
  }

  getAllAuthors(): Observable<any>{
    const params = new HttpParams().set('usertypeid',1);
    const url = `${this.url}/users`;
    return this.http.get(url, { params });
  }

  getAllQA(): Observable<any>{
    const params = new HttpParams().set('usertypeid',2);
    const url = `${this.url}/users`;
    return this.http.get(url, { params });
  }

  getAllCR(): Observable<any>{
    const params = new HttpParams().set('usertypeid',3);
    const url = `${this.url}/users`;
    return this.http.get(url, { params });
  }


  //To add user onto users table
  async signUp(userDetails: User){
    console.log(userDetails);
    await this.http.post(this.url + '/users', userDetails, this.httpOptions).subscribe((results)=> {
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
  async login(data:any){
    await this.http.post(this.url + "/login", data, this.httpOptions).subscribe((results)=> {
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      // console.log(jsObj);

      if(jsObj.success){
        this.http.get(this.url + "/user", this.httpOptions).subscribe((results) => {
          var resultString=JSON.stringify(results);
          var jsObj = JSON.parse(resultString);
          // console.log(jsObj);
          this.setLoggedIn(true);
          this.setUserDetails(jsObj.data);

          this.toastr.success(jsObj.message, 'Success');
          switch(jsObj.data.usertypeid){
            case 1:
              this.router.navigate(['/create']); break;
            case 2:
              this.router.navigate(['/qapool']); break;
            case 3:
              this.router.navigate(['/error']); break;
            case 4:
              this.router.navigate(['/error']); break;
            default:
              this.router.navigate(['/error']); break;
          }
          // this.router.navigate(['/home'])
        })

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
      if (cookie.startsWith(cookieName + '='))
        return true;
    }
    return false;
  }

  async checkIfLoggedIn(){
    console.log(this.checkCookieExists('cmscookie'));
    try{
      await this.http.get(this.url + "/user", this.httpOptions).subscribe((results) => {
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        console.log(jsObj);
        if(jsObj.success){
          this.setLoggedIn(true);
          this.setUserDetails(jsObj.data);
          return;
          // this.toastr.success(jsObj.message,'Success')
        }
        else{
          this.isLoggedIn.next(false);
          // this.setLoggedIn(false);
          this.userDetails.next(null);
          // this.setUserDetails(null);
          return false;
        }
      }, (err) => {
        console.log(err);
        this.isLoggedIn.next(false);
        // this.setLoggedIn(false);
        this.userDetails.next(null);
        // this.setUserDetails(null);
        return;
        // this.toastr.info('Please login to the application','Info')
      })
      }
    catch(e){
      console.log(e);
    }
  }

  logout(){
    // console.log(document.cookie);
    // this.cookieService.delete('cmscookie');
    document.cookie = "cmscookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // console.log(document.cookie);
    this.isLoggedIn.next(false);
    // this.setLoggedIn(false);
    this.userDetails.next(null);
    // this.setUserDetails(null);
    this.router.navigate(['/home']);
  }

}
