import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public comment : Observable<any>;
  
  constructor(private http: HttpClient) { }

  CreateComment(condition: any){
    return this.http.post(`${environment.apiUrl}Comment/CreateComment`, condition);
  }

  DeleteComment( CommentId: any){
    return this.http.post(`${environment.apiUrl}Comment/DeleteComment?CommentId=${CommentId}`, null);
  }
}
