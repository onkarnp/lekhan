import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ContentService } from 'src/app/service/content.service';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/shared/emitters';
import { SlicePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { CardDetailsComponent } from '../card-details/card-details.component'

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
    // this.http.get('http://localhost:3000/api/v1/cms/published').subscribe((results) => {
    //   var resultString=JSON.stringify(results);
    //   var jsObj = JSON.parse(resultString);
    //   if(jsObj.success){
    //     this.publishedArticles = jsObj.data;
    //     // console.log("published articles", this.publishedArticles);
    //   }
    //   else{
    //     console.log(jsObj.message);
    //   }

    // },(error)=>{
    //   console.log(error);

    // })

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
        console.log(jsObj.message);

      }

    })
  }

  // modifyArticlesData(data: any[]): any[] {
  //   return data.map((article) => {
  //     const modifiedArticle = { ...article };

  //     // Convert imgdata to URL
  //     modifiedArticle.imgurl = this.convertBufferToURL(modifiedArticle.imgdata);

  //     // Format submissiondate as 'YYYY-MM-DD'
  //     modifiedArticle.submissiondate = this.formatDate(modifiedArticle.submissiondate);

  //     return modifiedArticle;
  //   });
  // }

  // convertBufferToURL(bufferData: Buffer): string {
  //   const base64Data = bufferData.toString('base64');
  //   const mimeType = 'image/jpeg'; // Replace with the actual MIME type of your image
  //   return `data:${mimeType};base64,${base64Data}`;
  // }

  // convertBlobToURL(blobData: Blob): string {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blobData);
  //   return reader.result as string;
  // }

  // formatDate(dateString: string): string {
  //   const date = new Date(dateString);
  //   return date.toISOString().split('T')[0];
  // }



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
