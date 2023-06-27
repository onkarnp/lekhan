import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ContentService } from 'src/app/service/content.service';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/shared/emitters';
import { SlicePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { CardDetailsComponent } from '../card-details/card-details.component'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  publishedArticles:any;
  maxChars = 100;
  constructor(private dialog: MatDialog, private userService:UserService, private contentService:ContentService ,private http:HttpClient){}
  ngOnInit(): void {
    this.contentService.getPublishedArticles().subscribe((results) => {
      // Swal.showLoading()
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        // console.log(jsObj.data);
        this.publishedArticles = jsObj.data;
        // this.publishedArticles = this.modifyArticlesData(jsObj.data);
        console.log("publishedArticles",this.publishedArticles);
      }
      else{
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
