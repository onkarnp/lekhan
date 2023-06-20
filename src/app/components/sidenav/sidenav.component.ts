import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/service/content.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy{
  usertypes: any;
  selectedMenu = 0;
  showNestedList = false;
  selectedStatus = 0;
  showArticlesList = false;
  articlesData:any;
  isLoggedIn: boolean = false;
  userDetails: any = null;
  selected_status: number = 0;
  selected_article: any = null;
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();
  selectedStatusSubscription: Subscription = new Subscription();
  selectedArticleSubscription: Subscription = new Subscription();

  constructor(private formBuilder:FormBuilder, private userService:UserService, private contentService:ContentService,private http:HttpClient, private router:Router){}
  ngOnInit(): void{

    // this.userService.checkIfLoggedIn();
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
      if(this.isLoggedIn)
        this.selectedMenu = this.userDetails.usertypeid;
      else
        this.selectedMenu = 0;
    });

    this.selectedStatusSubscription = this.contentService.selected_status.subscribe(value => {
      this.selected_status = value;
      console.log("selected_status", this.selected_status);

    })

    this.selectedArticleSubscription = this.contentService.selected_article.subscribe(value => {
      this.selected_article = value;
      console.log("selected_article", this.selected_article);

    })

    //To get all usertyes
    this.userService.getUsertypes().subscribe((results) => {
      // console.log("usertypes", results);
      this.usertypes = results;
    },(errors) => {
      console.log(errors);
    });
  }


  setLoggedIn(value: boolean) {
    this.userService.setLoggedIn(value);
  }

  setUserDetails(value: any) {
    this.userService.setUserDetails(value);
  }

  toHome(){
    console.log(this.isLoggedIn);
    console.log(this.userDetails);
    this.router.navigate(['/home']);
  }

  logout() {
    // perform logout logic
    this.userService.setLoggedIn(false);
    this.userService.setUserDetails(null);
  }

  toggleNestedList():void {
    if(this.showNestedList){
      this.showNestedList = false;
    }
    else{
      this.showNestedList = true;
      this.selectedStatus = 0;
    }
  }

  closeArticlesList():void{
    this.articlesData = null;
    this.showArticlesList = false;
  }

  selectAllArticles():void {
    this.selectedStatus = 1;
    this.showArticlesList = true;
    const data = { userid: this.userDetails.userid }
    this.contentService.fetchAllArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.articlesData = jsObj.data;
        console.log("All articles: ",this.articlesData);
      }
      else{
        console.log(jsObj.message);
      }
    })
  }

  selectSaved():void {
    this.selectedStatus = 2;
    this.showArticlesList = true;
    const data = { userid: this.userDetails.userid, status: 'saved' }
    this.contentService.fetchSavedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.articlesData = jsObj.data;
        console.log("Saved articles: ",this.articlesData);
      }
      else{
        this.articlesData = null;
        console.log(jsObj.message);
      }
    })
  }

  selectFinalized():void {
    this.selectedStatus = 3;
    this.showArticlesList = true;
    const data = { userid: this.userDetails.userid, status: 'finalized' }
    this.contentService.fetchFinalizedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.articlesData = jsObj.data;
        console.log("Finalized articles: ",this.articlesData);
      }
      else{
        this.articlesData = null;
        console.log(jsObj.message);
      }
    })
  }

  selectQARequested():void {
    this.selectedStatus = 4;
    this.showArticlesList = true;
    const data = { userid: this.userDetails.userid }
    this.contentService.fetchQARequestedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.articlesData = jsObj.data;
        console.log("QA Requested articles: ",this.articlesData);
      }
      else{
        this.articlesData = null;
        console.log(jsObj.message);
      }
    })
  }

  selectQAChecked():void {
    this.selectedStatus = 5;
    this.showArticlesList = true;
    const data = { userid: this.userDetails.userid }
    this.contentService.fetchQACheckedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.articlesData = jsObj.data;
        console.log("QA Checked articles: ",this.articlesData);
      }
      else{
        this.articlesData = null;
        console.log(jsObj.message);
      }
    })
  }

  selectCRRequested():void {
    this.selectedStatus = 6;
    this.showArticlesList = true;
    const data = { userid: this.userDetails.userid }
    this.contentService.fetchCRRequestedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.articlesData = jsObj.data;
        console.log("CR Requested articles: ",this.articlesData);
      }
      else{
        this.articlesData = null;
        console.log(jsObj.message);
      }
    })
  }

  selectPublished():void {
    this.selectedStatus = 7;
    this.showArticlesList = true;
    const data = { userid: this.userDetails.userid }
    this.contentService.fetchPublishedArticles(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.articlesData = jsObj.data;
        console.log("User's published articles: ",this.articlesData);
      }
      else{
        this.articlesData = null;
        console.log(jsObj.message);
      }
    })
  }

  viewArticle(article:any){
    this.contentService.setSelectedArticle(article);
    // this.contentService.getArticleByContentid(article.contentid);
    this.contentService.setSelectedStatus(this.selectedStatus);
    this.router.navigate(['/viewarticle']);
  }



  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }

}
