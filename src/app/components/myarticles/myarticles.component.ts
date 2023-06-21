import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ContentService } from 'src/app/service/content.service';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/shared/emitters';
import { SlicePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { CardDetailsComponent } from '../card-details/card-details.component'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit{
  selectedStatus: number = 0;
  selectedView: number = 0;
  maxChars = 100;
  allArticles:any;
  savedArticles:any;
  finalizedArticles:any;
  qaRequestedArticles:any;
  qaApprovedArticles:any;
  crRequestedArticles:any;
  publishedArticles:any;
  userDetails: any = null;
  userDetailsSubscription: Subscription = new Subscription();

  constructor(private dialog: MatDialog, private userService:UserService, private contentService:ContentService ,private http:HttpClient){}
  async ngOnInit() {
    let data;
    this.userDetailsSubscription = await this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      data = { userid: this.userDetails.userid }
      console.log(this.userDetails);

      this.contentService.fetchAllArticles(data).subscribe((results) => {
        console.log(results);
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        if(jsObj.success){
          this.allArticles = jsObj.data;
          console.log("All articles: ",this.allArticles);
        }
        else{
          console.log(jsObj.message);
        }
      })

      this.contentService.fetchSavedArticles(data).subscribe((results) => {
        console.log(results);
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        if(jsObj.success){
          this.savedArticles = jsObj.data;
          console.log("Saved articles: ",this.savedArticles);
        }
        else{
          this.savedArticles = null;
          console.log(jsObj.message);
        }
      })

      this.contentService.fetchFinalizedArticles(data).subscribe((results) => {
        console.log(results);
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        if(jsObj.success){
          this.finalizedArticles = jsObj.data;
          console.log("Finalized articles: ",this.finalizedArticles);
        }
        else{
          this.finalizedArticles = null;
          console.log(jsObj.message);
        }
      })

      this.contentService.fetchQARequestedArticles(data).subscribe((results) => {
        console.log(results);
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        if(jsObj.success){
          this.qaRequestedArticles = jsObj.data;
          console.log("QA Requested articles: ",this.qaRequestedArticles);
        }
        else{
          this.qaRequestedArticles = null;
          console.log(jsObj.message);
        }
      })

      this.contentService.fetchQACheckedArticles(data).subscribe((results) => {
        console.log(results);
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        if(jsObj.success){
          this.qaApprovedArticles = jsObj.data;
          console.log("QA Checked articles: ",this.qaApprovedArticles);
        }
        else{
          this.qaApprovedArticles = null;
          console.log(jsObj.message);
        }
      })

      this.contentService.fetchCRRequestedArticles(data).subscribe((results) => {
        console.log(results);
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        if(jsObj.success){
          this.crRequestedArticles = jsObj.data;
          console.log("CR Requested articles: ",this.crRequestedArticles);
        }
        else{
          this.crRequestedArticles = null;
          console.log(jsObj.message);
        }
      })

      this.contentService.getPublishedArticles().subscribe((results) => {
        console.log(results);
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        if(jsObj.success){
          this.publishedArticles = jsObj.data;
          console.log("publishedArticles",this.publishedArticles);
        }
        else{
          console.log(jsObj.message);
        }
      })

    });

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


  onStatusChange(): void{
    console.log("selectedStatus", this.selectedStatus);
  }
  onViewChange(): void{
    console.log("selectedView", this.selectedView);
  }
}
