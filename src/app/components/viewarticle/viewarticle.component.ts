import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/service/content.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewarticle',
  templateUrl: './viewarticle.component.html',
  styleUrls: ['./viewarticle.component.css']
})
export class ViewarticleComponent implements OnInit, OnDestroy{
  isSaveButtonHidden=true;
  isPublishButtonHidden=true;
  formNotSaved = false;
  contentForm!:FormGroup;
  assignQAForm!:FormGroup;
  selectedFile!:File;
  fileContentArrayBuffer!:ArrayBuffer;
  filePreviewUrl: string='';
  editingmode = false;
  showRequestQADiv = false;
  allQA:any;


  // formData = new FormData();

  isLoggedIn: boolean = false;
  userDetails: any = null;
  selected_status: number = 0;
  selected_article: any = null;
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();
  selectedStatusSubscription: Subscription = new Subscription();
  selectedArticleSubscription: Subscription = new Subscription();

  constructor(private contentService:ContentService, private formBuilder: FormBuilder,private userService:UserService ,private http:HttpClient, private toastr: ToastrService, private router: Router){}


  ngOnInit(){
    this.userService.checkIfLoggedIn();
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });

    this.userDetailsSubscription = this.userService.userDetails.subscribe(value => {
      this.userDetails = value;
      console.log(this.userDetails);
    });

    this.selectedStatusSubscription = this.contentService.selected_status.subscribe(value => {
      this.selected_status = value;
      console.log("selected_status", this.selected_status);

    })

    this.selectedArticleSubscription = this.contentService.selected_article.subscribe(value => {
      this.selected_article = value;
      console.log("selected_article", this.selected_article);
      this.editingmode = false;
      this.showRequestQADiv = false;
    })

    this.contentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.contentForm.valueChanges.subscribe(()=>{
      this.formNotSaved = true;
    })

    this.assignQAForm = new FormGroup({
      requestedQA: new FormControl('', Validators.required)
    })
  }


  async getUpdatedContent(){
    await this.contentService.getArticleByContentid(this.selected_article.contentid).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        console.log("updated article", jsObj.data);
        this.contentService.setSelectedArticle(jsObj.data);
      }
      else{
        this.toastr.error(jsObj.message, 'Failed')
      }
    })
  }



  async openRequestQADiv(){
    this.showRequestQADiv = true;
    await this.userService.getAllQA().subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.allQA = jsObj.data;
        console.log("All QAs list: ",this.allQA);
      }
      else{
        this.allQA = null;
        console.log(jsObj.message);
      }
    })


  }

  async assignQA(form: FormGroup){
    if(!this.assignQAForm.valid){
      this.toastr.info('Input not valid', 'Error')
      return;
    }
    const data = {assignedqa: form.value.requestedQA, contentid: this.selected_article.contentid};
    console.log(data);
    await this.contentService.assignQA(data).subscribe((results) => {
      console.log(results);
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      if(jsObj.success){
        this.toastr.success(jsObj.message, 'Success');
        this.showRequestQADiv = false;
        this.contentService.triggerArticleChanged();
        // this.getUpdatedContent();
      }
      else
        this.toastr.success(jsObj.message, 'Success');
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
  async saveEditedContent(){
    const formData = new FormData()
    formData.append('contentid', this.selected_article.contentid);
    formData.append('title', this.contentForm.value.title);
    formData.append('description', this.contentForm.value.description);
    formData.append('userid', this.userDetails.userid);
    formData.append('usertypeid', this.userDetails.usertypeid);
    formData.append('status', 'saved');
    // const fileBlob = new Blob([this.fileContentArrayBuffer])
    if(this.selectedFile)
      formData.append('file', this.selectedFile, this.selectedFile.name);

    console.log(formData.get('title'));
    console.log(formData.get('description'));
    if(this.selectedFile)
      console.log(formData.get('file'));
    await this.contentService.saveEditedArticle(formData).subscribe((results)=>{
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      console.log(jsObj);
      if(jsObj.success){
        this.formNotSaved = false;
        // this.editingmode = false;
        this.toastr.success(jsObj.message, 'Success');
        this.contentService.triggerArticleChanged();
        // this.getUpdatedContent();
      }
      else{
        this.toastr.error(jsObj.message, 'Failed')
      }
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error')
    })
  }

  //Function to finalize edited content
  async finalizeEditedContent(){
    if(this.formNotSaved){
      this.toastr.info("Kindly save the unsaved changes", 'Info');
      return;
    }
    const data = { contentid: this.selected_article.contentid, userid: this.userDetails.userid };
    await this.contentService.finalizeEditedContent(data).subscribe((results) => {
      var resultString=JSON.stringify(results);
      var jsObj = JSON.parse(resultString);
      console.log(jsObj);
      if(jsObj.success){
        this.editingmode = false;
        this.router.navigate(['/viewarticle']);
        // this.toastr.success(jsObj.message, 'Success');
        this.contentService.triggerArticleChanged();
        Swal.fire({
          icon: 'success',
          title: 'Congratulations 🎉🎉',
          text: jsObj.message,
          showConfirmButton: false,
          timer: 2000,
        })
        // this.getUpdatedContent();
      }
      else{
        this.toastr.error(jsObj.message, 'Failed')
      }
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error')
    })
  }

  editModeOn(){
    this.editingmode = true;
    this.contentForm.get('title')?.setValue(this.selected_article.title);
    this.filePreviewUrl = this.selected_article.base64FileData;
    this.contentForm.get('description')?.setValue(this.selected_article.description);
    this.formNotSaved = false;
  }

  editModeoff(){
    this.editingmode = false;
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
    this.selectedStatusSubscription.unsubscribe();
    this.selectedArticleSubscription.unsubscribe();
  }

}
