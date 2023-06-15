import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import User from '../model/user'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  url = "http://localhost:3000/api/v1/cms"
  constructor(private http:HttpClient, private router:Router, private toastr: ToastrService) { }

  selected_status: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selected_article: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
  };
  httpMultipartOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    withCredentials: true
  }

  setSelectedStatus(value: number) {
    this.selected_status.next(value);
  }

  getSelectedStatus():number{
    return this.selected_status.getValue();
  }

  setSelectedArticle(value: any) {
    this.selected_article.next(value);
  }

  getSelectedArticle():object{
    return this.selected_article.getValue();
  }

  //To get published articles
  getPublishedArticles(): Observable<any> {
    const url = `${this.url}/published`;
    return this.http.get(url);
  }

  //To save article
  saveArticle(formData:any): Observable<any>{
    const url = `${this.url}/save`;
    return this.http.post(url, formData);
  }

  //To publish article
  publishArticle(formData:any): Observable<any>{
    const url = `${this.url}/publish`;
    return this.http.post(url, formData);
  }

  //To fetch all articles
  fetchAllArticles(data:any): Observable<any>{
    console.log(data);
    const params = new HttpParams().set('userid',data.userid);
    const url = `${this.url}/all`;
    return this.http.get(url, { params });
  }

  //To fetch saved articles
  fetchSavedArticles(data:any): Observable<any>{
    console.log(data);
    const params = new HttpParams().set('userid',data.userid).set('status',data.status);
    const url = `${this.url}/saved`;
    return this.http.get(url, { params });
  }

  //To fetch finalized articles
  fetchFinalizedArticles(data:any): Observable<any>{
    console.log(data);
    const params = new HttpParams().set('userid',data.userid).set('status',data.status);
    const url = `${this.url}/finalized`;
    return this.http.get(url, { params });
  }

   //To fetch QA requested articles
  fetchQARequestedArticles(data:any): Observable<any>{
    const params = new HttpParams().set('userid',data.userid);
    const url = `${this.url}/qarequested`;
    return this.http.get(url, { params });
  }

  //To fetch QA checked articles
  fetchQACheckedArticles(data:any): Observable<any>{
    const params = new HttpParams().set('userid',data.userid);
    const url = `${this.url}/qachecked`;
    return this.http.get(url, { params });
  }

  //To fetch CR checked articles
  fetchCRRequestedArticles(data:any): Observable<any>{
    const params = new HttpParams().set('userid',data.userid);
    const url = `${this.url}/crrequested`;
    return this.http.get(url, { params });
  }

  //To get user's published articles
  fetchPublishedArticles(data:any): Observable<any>{
    const params = new HttpParams().set('userid',data.userid);
    const url = `${this.url}/user_published`;
    return this.http.get(url, { params });
  }

  //To save edited article in view article page
  saveEditedArticle(formData:any): Observable<any>{
    const url = `${this.url}/save_edited`;
    return this.http.post(url, formData);
  }

  //To publish the edited article in view article page
  publishEditedContent(data:any): Observable<any>{
    console.log(data);

    const params = new HttpParams().set('contentid',data.contentid);
    const url = `${this.url}/publish_edited`;
    console.log(params);

    return this.http.post(url, data);
  }

  //To assign QA for a content
  assignQA(data:any): Observable<any>{
    const params = new HttpParams().set('assignedqa',data.assignedqa).set('contentid',data.contentid);
    const url = `${this.url}/assignqa`;
    return this.http.get(url, { params });
  }

}
