import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, isEmpty } from 'rxjs';
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
  fileContentArrayBuffer!:ArrayBuffer;
  filePreviewUrl: string='';
  // formData = new FormData();

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

    // this.contentForm = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   file: [null, Validators.required],
    //   description: ['', Validators.required]
    // })

    this.contentForm = new FormGroup({
    title: new FormControl('', Validators.required),
    file: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required)
  });
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

  //Function calling content service to save content
  saveContent(){
    if(!this.contentForm.valid){
      this.toastr.info('Please input all fields', 'Info')
      return;
    }
    const reader= new FileReader();
    reader.onload = (e:any) => {
        console.log(e);

        this.fileContentArrayBuffer = e.target.result;
        // this.fileContentArrayBuffer = e.target.result as ArrayBuffer;
        console.log("fileContentArrayBuffer: ", this.fileContentArrayBuffer);
    }
    reader.readAsArrayBuffer(this.selectedFile);

    const formData = new FormData()
    formData.append('title', this.contentForm.value.title);
    formData.append('description', this.contentForm.value.description);
    // const fileBlob = new Blob([this.fileContentArrayBuffer])
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('author', this.userDetails.userid);
    formData.append('status', 'saved');

    console.log(formData.get('title'));
    console.log(formData.get('description'));
    console.log(formData.get('file'));
    console.log(formData.get('author'));
    console.log(formData.get('status'));
    this.contentService.saveArticle(formData);
  }

  //Function calling content service to publish content
  publishContent(){

  }



}
