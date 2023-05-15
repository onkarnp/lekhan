import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';
  sideBarOpen = true;
  isLoggedIn:boolean = false;
  userDetails:any;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  constructor(private userService:UserService ,private http:HttpClient, private toastr: ToastrService){}
  ngOnInit(): void {
    this.userService.checkIfLoggedIn();


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
}
