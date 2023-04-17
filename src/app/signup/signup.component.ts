import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CmsServiceService } from '../service/cms-service.service';
import User from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!:FormGroup;
  signupSubmitted=false;
  usertypeid = null;
  usertypes: any;
  errorMessage: string = "";
  passwordsMatch:boolean = true;

  constructor(private formBuilder:FormBuilder, private cmsData:CmsServiceService ,private http:HttpClient, private router:Router){}

  ngOnInit(){
    //validations
    this.signupForm = this.formBuilder.group({
      username: ['',Validators.required],
      usertypeid: ['', Validators.required],
      usermail: ['', [Validators.required, Validators.email]],
      userpass: ['', [Validators.required, Validators.minLength(3)]],
      userpass1: ['', [Validators.required, Validators.minLength(3)]]
    })


    //To get all usertyes
    this.cmsData.getUsertypes().subscribe((results) => {
      console.log("results", results);
      this.usertypes = results;
      console.log(this.usertypes);

    })

  }

  onSignup(form: FormGroup){
    const userDetails = new User(form.value.username, form.value.usertypeid, form.value.usermail, form.value.userpass);
    console.log(userDetails);
    this.signupSubmitted = true;
    if(this.signupForm.invalid || (!this.passwordsMatch)){
      return;
    }
    this.cmsData.addUser(userDetails);
    this.router.navigate(['Login'])
  }

  checkPasswords(form:FormGroup){
    this.passwordsMatch = (form.value.userpass == form.value.userpass1);
  }

}
