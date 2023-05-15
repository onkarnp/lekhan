import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import User from '../model/user'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { Emitters } from '../shared/emitters';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  url = "http://localhost:3000/api/v1/cms"
  constructor(private http:HttpClient, private router:Router, private toastr: ToastrService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
  };

  //To get published articles
  login(data:any){
    this.http.post(this.url + "/login", data, this.httpOptions).subscribe((results)=> {
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.toastr.success(jsObj.message, 'Success');
        this.router.navigate(['/home'])
      }
      else{
        this.toastr.error(jsObj.message, 'Failed')
      }
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error')
    })
  }


  // getPublishedArticles(){
  //   this.http.get(this.url + "/published").subscribe((results) => {
  //     var resultString=JSON.stringify(results);
  //     var jsObj = JSON.parse(resultString);
  //     return jsObj;
  //   }, (err)=>{
  //     console.log(err);
  //     this.toastr.error(err.error.message, 'Error')
  //   })
  // }

}
