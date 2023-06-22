import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentService } from 'src/app/service/content.service';
import { UserService } from 'src/app/service/user.service';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qatracking',
  templateUrl: './qatracking.component.html',
  styleUrls: ['./qatracking.component.css']
})
export class QatrackingComponent implements OnInit {
  QAApprovedArticles:any;
  isLoggedIn: boolean = false;
  userDetails: any = null;

  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();


  constructor(private dialog: MatDialog, private userService:UserService, private contentService:ContentService ,private http:HttpClient, private toastr: ToastrService,private router:Router){}
  ngOnInit(): void {

    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
      this.getQAApprovedArticles();
    });


  }


  async getQAApprovedArticles(){
    const data = { qaid: this.userDetails.userid }
    await this.contentService.fetchQACheckedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        // console.log(jsObj.data);
        this.QAApprovedArticles = jsObj.data;
        // this.publishedArticles = this.modifyArticlesData(jsObj.data);
        console.log("publishedArticles",this.QAApprovedArticles);
      }
      else{
        this.QAApprovedArticles = null;
        console.log(jsObj.message);
      }
    })
  }

  openCardDetails(article:any){
    const dialogRef = this.dialog.open(CardDetailsComponent, {
      data: {
        article,
      },
      height:'100%',
      width:'100%',
    });
  }

}
