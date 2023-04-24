import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import User from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  signupSubmitted=false;
  loginSubmitted=false;
  showlogin: boolean = true;
  usertypeid = null;
  usertypes: any;
  errorMessage: string = "";

  constructor(private formBuilder:FormBuilder, private userService:UserService ,private http:HttpClient, private router:Router){}

  ngOnInit(){
    //validations

    this.loginForm = this.formBuilder.group({
      usermail: ['', [Validators.required, Validators.email]],
      userpass: ['', [Validators.required, Validators.minLength(3)]]
    })

    //To get all usertyes
    this.userService.getUsertypes().subscribe((results) => {
      console.log("results", results);
      this.usertypes = results;
      console.log(this.usertypes);

    })
  }


  onLogin(form: FormGroup){
    this.loginSubmitted=true;

    const loginCredentials = {usermail: form.value.usermail, userpass: form.value.userpass};
    // console.log(loginCredentials);

    if(this.loginForm.invalid){
      return;
    }
    this.userService.login(loginCredentials);


  }
}
