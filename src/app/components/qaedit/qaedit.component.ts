import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/service/content.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-qaedit',
  templateUrl: './qaedit.component.html',
  styleUrls: ['./qaedit.component.css']
})
export class QaeditComponent implements OnInit, OnDestroy{
  isSaveButtonHidden=true;
  formNotSaved = false;
  contentForm!:FormGroup;
  selectedFile!:File;
  fileContentArrayBuffer!:ArrayBuffer;
  filePreviewUrl: string='';


  // formData = new FormData();

  isLoggedIn: boolean = false;
  userDetails: any = null;
  selected_article: any = null;
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();
  selectedArticleSubscription: Subscription = new Subscription();

  constructor(private contentService:ContentService, private formBuilder: FormBuilder,private userService:UserService ,private http:HttpClient, private toastr: ToastrService, private router: Router){}


  ngOnInit(){

    this.contentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.userService.checkIfLoggedIn();
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
    });

    this.selectedArticleSubscription = this.contentService.selected_article.subscribe(value => {
      this.selected_article = value;
      console.log("selected_article", this.selected_article);
      this.contentForm.get('title')?.setValue(this.selected_article.title);
      this.filePreviewUrl = this.selected_article.base64FileData;
      this.contentForm.get('description')?.setValue(this.selected_article.description);
      this.formNotSaved = false;
    })

    this.contentForm.valueChanges.subscribe(()=>{
      this.formNotSaved = true;
    })
  }


  async approveArticle(){
    const data = {contentid: this.selected_article.contentid, qaid: this.userDetails.userid};
    await this.contentService.approveArticle(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.toastr.success(jsObj.message, 'Success');
        this.router.navigate(['/qapending']);
      }
      else
        this.toastr.error(jsObj.message, 'Failed');
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error')
    })

  }



  adjustTextAreaHeight(){
    const textarea: HTMLElement|any = document.querySelector('textarea');
    textarea.style.height= 'auto';
    textarea.style.height= (textarea.scrollHeight<300)?'300px':textarea.scrollHeight + 'px';
  }

    //Event listener for file preview
    onFileSelected(event:any){
      console.log(event);
      this.selectedFile = event.target.files[0];
      // const inputElement: any = event.target as HTMLInputElement;
      // this.selectedFile = inputElement.files[0];
      console.log(this.selectedFile);

      const reader= new FileReader();
      reader.onloadend = (e:any) => {
        this.filePreviewUrl = e.target.result;
        // console.log("filePreviewUrl: ", this.filePreviewUrl);
        };
      reader.readAsDataURL(this.selectedFile);
    }



    //Function to save edited content
  saveEditedContent(){
    const formData = new FormData()
    formData.append('contentid', this.selected_article.contentid);
    formData.append('title', this.contentForm.value.title);
    formData.append('description', this.contentForm.value.description);
    formData.append('userid', this.userDetails.userid);
    formData.append('usertypeid', this.userDetails.usertypeid);
    // const fileBlob = new Blob([this.fileContentArrayBuffer])
    if(this.selectedFile)
      formData.append('file', this.selectedFile, this.selectedFile.name);

    console.log(formData.get('title'));
    console.log(formData.get('description'));
    if(this.selectedFile)
      console.log(formData.get('file'));
    this.contentService.saveEditedArticle(formData).subscribe((results)=>{
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      console.log(jsObj);
      if(jsObj.success){
        this.formNotSaved = false;
        // this.editingmode = false;
        this.toastr.success(jsObj.message, 'Success');
      }
      else{
        this.toastr.error(jsObj.message, 'Failed')
      }
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error')
    })
  }


  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
    this.selectedArticleSubscription.unsubscribe();
  }

}
