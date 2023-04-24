import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  usertypes: any;
  constructor(private formBuilder:FormBuilder, private userService:UserService ,private http:HttpClient, private router:Router){}
  ngOnInit(){


    //To get all usertyes
    this.userService.getUsertypes().subscribe((results) => {
      console.log("results", results);
      this.usertypes = results;
      console.log(this.usertypes);

    })
  }
}
