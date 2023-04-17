import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import User from '../model/user'
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class CmsServiceService {
  url = "http://localhost:3000/api/v1/cms"
  constructor(private http:HttpClient) { }
  //To get usertypes available
  getUsertypes(){
    return this.http.get(this.url + '/usertypes');
  }

  //To add user onto users table
  addUser(userDetails: User){
    console.log(userDetails);
    this.http.post(this.url + '/users', userDetails).subscribe((results)=> {
      console.log(results);
      alert(results);
    }, (error) => {
      console.log(error);
      alert(error.message);
    });
  }

  checkUserByMailPassword(data:any){
    this.http.post(this.url + "/users/login", data).subscribe((results)=> {
      console.log(results);
      alert(results);

    }, (error) => {
      console.log(error);
      alert(error.message);
    })
  }

}
