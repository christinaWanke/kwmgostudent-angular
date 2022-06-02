import { Injectable } from '@angular/core';
import {Course, Image, Slot, User} from "./course";
import {Comment} from "./comment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable()

export class CourseArchiveService {
  private api = 'http://kwmgostudent.s1910456034.student.kwmhgb.at/api';


  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Course>>{
    return this.http.get<Array<Course>>(`${this.api}/courses`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(cnum: string): Observable<Course>{
    return this.http.get<Course>(`${this.api}/courses/short/${cnum}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(course: Course): Observable<any>{
    return this.http.post(`${this.api}/courses`, course)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(course: Course): Observable<any>{
    return this.http.put(`${this.api}/courses/${course.cnum}`, course)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(cnum: string): Observable<any>{
    return this.http.delete(`${this.api}/courses/${cnum}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  check(cnum:string): Observable<Boolean>{
    return this.http.get<Boolean>(`${this.api}/courses/checkCnum/${cnum}`).pipe(catchError(this.errorHandler));
  }

  /**************************************************************************************************************************/

  getCommentById(id: number) : Observable<Comment> {
    return this.http.get<Comment>(`${this.api}/comments/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  createComment(comment: Comment) : Observable<any>{
    return this.http.post(`${this.api}/comments`, comment).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*updateComment(comment: Comment) : Observable<any>{
    return this.http.put(`${this.api}/comments/${comment.id}`, comment).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }*/

  updateComment(comment: Comment): Observable<any>{
    return this.http.put(`${this.api}/comments/${comment.id}`, comment)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  removeComment(id: number) : Observable<any> {
    return this.http.delete(`${this.api}/comments/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /**************************************************************************************************************************/


  private errorHandler (error: Error | any): Observable<any>{
    return throwError(error);
  }


}

/*this.courses = [
      new Course(
        1,
        "OOP",
        "Objekt Orientierte Programmierung",
        "Lalalal zacher scheiß",
        new User(1, "s19104560tu", "Test", "User", "test@gmail.com", "secret", false),
        [ new Slot(1, new Date(), new Date(), new Date(), false), new Slot(2, new Date(), new Date(), new Date(), false)],
        [new Image(1, "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2406&q=80", "Programmieren")],
        2,
        "Schreiner"),
      new Course(
        2,
        "WHM",
        "Web- und Hypermedia",
        "Lalalal zacher scheiß",
        new User(1, "s19104560tu", "Test", "User", "test@gmail.com", "secret", false),
        [ new Slot(1, new Date(), new Date(), new Date(), false), new Slot(2, new Date(), new Date(), new Date(), false)],
        [new Image(1, "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2406&q=80", "Programmieren")],
        1,
        "Augstein")
    ];*/
