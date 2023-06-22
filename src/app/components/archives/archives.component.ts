import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentService } from 'src/app/service/content.service';
import { UserService } from 'src/app/service/user.service';
import { CardDetailsComponent } from '../card-details/card-details.component';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit{
  publishedArticles:any;
  constructor(private dialog: MatDialog, private userService:UserService, private contentService:ContentService ,private http:HttpClient){}
  ngOnInit(): void {
    this.contentService.getPublishedArticles().subscribe((results) => {
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
        this.publishedArticles = null;
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
