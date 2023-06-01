import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ContentService } from 'src/app/service/content.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isSaveButtonHidden=true;
  isPublishButtonHidden=true;
  contentForm!:FormGroup;
  selectedFile!:File;
  imageFilePreviewUrl: string='';
  sampleDataUrl: string='';

  isLoggedIn: boolean = false;
  userDetails: any = null;
  isLoggedInSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();
  // @ViewChild('fileInput') fileInput:any;

  constructor(private contentService:ContentService, private formBuilder: FormBuilder,private userService:UserService ,private http:HttpClient, private toastr: ToastrService){}

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

    this.contentForm = this.formBuilder.group({
      title: ['', Validators.required],
      imageUpload: ['', Validators.required],
      description: ['', Validators.required]
    })

  //   this.contentForm = new FormGroup({
  //   title: new FormControl(null, Validators.required),
  //   imageUpload: new FormControl(null, Validators.required),
  //   description: new FormControl(null, Validators.required)
  // });
  }

  adjustTextAreaHeight(){
    const textarea: HTMLElement|any = document.querySelector('textarea');
    textarea.style.height= 'auto';
    textarea.style.height= textarea.scrollHeight + 'px';
  }


  onFileSelected(event: Event){
    const inputElement: any = event.target as HTMLInputElement;
    this.selectedFile = inputElement.files[0];
    console.log(this.selectedFile);
    const reader= new FileReader();
    reader.onloadend = (e:any) => {
      this.imageFilePreviewUrl = e.target.result;
      console.log("imagePreviewUrl: ", this.imageFilePreviewUrl);
      };
    reader.readAsDataURL(this.selectedFile);
  }

  // previewSelectedFile(){
  //   const reader= new FileReader();
  //   reader.onload = (e:any) => {
  //     this.imageFilePreviewUrl = e.target.result;
  //   };
  //   reader.readAsDataURL(this.selectedImageFile);
  // }


  saveContent(){
    // const reader= new FileReader();
    // reader.onload = (e:any) => {
    //     const fileContentArrayBuffer = e.target.result as ArrayBuffer;
    //     console.log("fileContentArrayBuffer: ", fileContentArrayBuffer);
    // }
    // reader.readAsArrayBuffer(this.selectedFile);

    // if(this.contentForm.invalid){
    //   this.toastr.info('Please input all fields', 'Info')
    //   return;
    // }

    // const data = {title: this.contentForm.value.title, description: this.contentForm.value.description, imageUpload: this.contentForm.value.imageUpload, userid: this.userDetails.userid, status: 'saved'};

    // const formData = new FormData(); debugger;

    // formData.append('title', this.contentForm.value.title);
    // formData.append('imageUpload', this.contentForm.value.imageUpload);
    // formData.append('description', this.contentForm.value.description);
    // formData.append('userid', this.userDetails.userid);
    // formData.append('status', 'saved');

    // this.contentService.saveArticle(data);
  }


  publishContent(){

  }



}
