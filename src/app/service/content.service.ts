import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import User from '../model/user'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { Emitters } from '../shared/emitters';
import { Observable } from 'rxjs';

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
  httpMultipartOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    withCredentials: true
  }

  //To get published articles
  getPublishedArticles(): Observable<any> {
    const url = `${this.url}/published`;
    return this.http.get(url);
  }

  //To save article
  saveArticle(formData:any): Observable<any>{
    const url = `${this.url}/save`;
    return this.http.post(url, formData);
  }

  //To publish article
  publishArticle(formData:any): Observable<any>{
    const url = `${this.url}/save`;
    return this.http.post(url, formData);
  }

// //To get published articles
// login(data:any){
//   this.http.post(this.url + "/login", data, this.httpOptions).subscribe((results)=> {
//     var resultString=JSON.stringify(results);
//     var jsObj = JSON.parse(resultString);
//     if(jsObj.success){
//       this.toastr.success(jsObj.message, 'Success');
//       this.router.navigate(['/home'])
//     }
//     else{
//       this.toastr.error(jsObj.message, 'Failed')
//     }
//   }, (err) => {
//     console.log(err);
//     this.toastr.error(err.error.message, 'Error')
//   })
// }


//  async saveArticle(formData:any){
//   await this.http.post(this.url + '/save', formData).subscribe((results)=>{
//     var resultString=JSON.stringify(results);
//     var jsObj = JSON.parse(resultString);
//     console.log(jsObj);
//     if(jsObj.success){
//       this.toastr.success(jsObj.message, 'Success');
//     }
//     else{
//       this.toastr.error(jsObj.message, 'Failed')
//     }
//   }, (err) => {
//     console.log(err);
//     this.toastr.error(err.error.message, 'Error')
//   })
//  }

//  async publishArticle(formData:any){
//   await this.http.post(this.url + '/save', formData).subscribe((results)=>{
//     var resultString=JSON.stringify(results);
//     var jsObj = JSON.parse(resultString);
//     console.log(jsObj);
//     if(jsObj.success){
//       const data = {title: formData.get('title'), author: formData.get('author')}
//       this.http.post(this.url + '/publish',data).subscribe((results)=>{
//         var resultString=JSON.stringify(results);
//         var jsObj = JSON.parse(resultString);
//         console.log(jsObj);
//         if(jsObj.success){
//           this.toastr.success(jsObj.message, 'Success');
//         }
//         else{
//           this.toastr.error(jsObj.message, 'Failed')
//         }
//       })
//     }
//     else{
//       this.toastr.error(jsObj.message, 'Failed')
//     }
//   }, (err) => {
//     console.log(err);
//     this.toastr.error(err.error.message, 'Error')
//   })
//  }

}
