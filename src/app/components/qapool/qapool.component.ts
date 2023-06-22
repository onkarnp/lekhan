import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentService } from 'src/app/service/content.service';
import { UserService } from 'src/app/service/user.service';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qapool',
  templateUrl: './qapool.component.html',
  styleUrls: ['./qapool.component.css']
})
export class QapoolComponent implements OnInit, OnDestroy {
  FinalizedArticles:any;
  isLoggedIn: boolean = false;
  userDetails: any = null;
  selected_article: any = null;
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();
  selectedArticleSubscription: Subscription = new Subscription();




  constructor(private dialog: MatDialog, private userService:UserService, private contentService:ContentService ,private http:HttpClient, private toastr: ToastrService,private router:Router){}
  ngOnInit(): void {

    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
      this.getArticlesPool();
    });

    this.selectedArticleSubscription = this.contentService.selected_article.subscribe(value => {
      this.selected_article = value;
      console.log("selected_article", this.selected_article);
    })


  }


  async getArticlesPool(){
    const data = { status: 'finalized' }
    await this.contentService.fetchFinalizedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.FinalizedArticles = jsObj.data;
        console.log("FinalizedArticles",this.FinalizedArticles);
      }
      else{
        this.FinalizedArticles = null;
        console.log(jsObj.message);
      }
    })
  }

  async assignToMe(contentid:any){
    const data = {assignedqa: this.userDetails.userid, contentid: contentid};
    console.log(data);
    await this.contentService.assignQA(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.toastr.success(jsObj.message, 'Success');
        this.getArticlesPool();
      }
      else
        this.toastr.success(jsObj.message, 'Success');
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error')
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



  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }

}
