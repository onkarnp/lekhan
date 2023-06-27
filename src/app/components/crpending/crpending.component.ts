import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentService } from 'src/app/service/content.service';
import { UserService } from 'src/app/service/user.service';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Subscription, filter, switchMap, take, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crpending',
  templateUrl: './crpending.component.html',
  styleUrls: ['./crpending.component.css']
})
export class CrpendingComponent implements OnInit, OnDestroy {
  RequestedArticles:any;
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
      this.getCRRequestedArticles();
    });

    this.selectedArticleSubscription = this.contentService.selected_article.subscribe(value => {
      this.selected_article = value;
      console.log("selected_article", this.selected_article);
    })


  }

  async getCRRequestedArticles(){
    const data = { crid: this.userDetails.userid }
    await this.contentService.fetchCRRequestedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.RequestedArticles = jsObj.data;
        console.log("RequestedArticles",this.RequestedArticles);
      }
      else{
        this.RequestedArticles =  null;
        console.log(jsObj.message);
      }
    })
  }

  async approveArticle(article:any){
    const data = {contentid: article.contentid, crid: this.userDetails.userid};
    await this.contentService.approveArticle(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Article has been approved',
          showConfirmButton: false,
          timer: 2000
        })
        // this.toastr.success(jsObj.message, 'Success');
        this.getCRRequestedArticles();
      }
      else
        this.toastr.success(jsObj.message, 'Success');
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error')
    })
  }

  async rejectArticle(article:any){
    const { value: rejectedRemark } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Rejection remark',
      inputPlaceholder: 'Enter your remark...',
      inputAttributes: {
        'aria-label': 'Enter your remark here'
      },
      // showCancelButton: true,
      confirmButtonText: 'Submit',
    })

    // const rejectedRemark = prompt("Enter remark for rejection: ");
    console.log("rejectedRemark: " + rejectedRemark);
    if(rejectedRemark==null || rejectedRemark==''){
      this.toastr.info('Remark is mandetory to reject an article!', 'Info');
      return;
    }
    else{
      const data = {contentid: article.contentid, crid: this.userDetails.userid, rejectedRemark: rejectedRemark};
      await this.contentService.rejectArticle(data).subscribe((results) => {
        console.log(results);
        var resultString=JSON.stringify(results);
        var jsObj = JSON.parse(resultString);
        if(jsObj.success){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'The article has been rejected and sent back!',
            showConfirmButton: false,
            timer: 2000
          })
          // this.toastr.success(jsObj.message, 'Success');
          this.getCRRequestedArticles();
        }
        else
          this.toastr.error(jsObj.message, 'Failed');
      }, (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error')
      })
    }
  }

  checkPrompt(){
    const userInput = prompt("Enter your name:");
    console.log("User entered: " + userInput);
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

  editArticle(article:any){
    this.contentService.setSelectedArticle(article);
    this.router.navigate(['/qaedit']);
  }



  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }

}
