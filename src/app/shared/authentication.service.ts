import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "./user";
import {catchError, retry} from "rxjs/operators";




interface Token{
  exp: number;
  user: {
    id: string,
    persnum: string,
    firstName:string,
    lastName:string,
    email: string,
    description: string,
    isTutor: boolean,
    semester: number
  }
}

@Injectable()


export class AuthenticationService {
  private authApi = 'http://kwmgostudent.s1910456034.student.kwmhgb.at/api/auth';
  private api = 'http://kwmgostudent.s1910456034.student.kwmhgb.at/api';
  tutorStatus: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post(`${this.authApi}/login`, {
      email: email,
      password: password
    });
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }



  public setSessionStorage(token: string){

    const decodedToken = jwt_decode(token) as Token;

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  logout(){
    this.http.post(`${this.authApi}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    this.tutorStatus = false;
    console.log("Logged out");
  }

  public isLoggedIn(){
    if (sessionStorage.getItem("token")){
      let token : string = <string> sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);

      if (expirationDate < new Date()){
        console.log("token expired");
        sessionStorage.removeItem("token");
        return false;
      }
      return true;
    }else {
      return false;
    }
  }

  public isLoggedOut(){
    return !this.isLoggedIn();
  }


  getCurrentUser() : User {
    return this.decodeToken();
  }

  decodeToken(): User {
    if (sessionStorage.getItem("token")) {
      const decodedToken = jwt_decode(<string>sessionStorage.getItem("token")) as Token;
      return new User(
        +decodedToken.user.id,
        decodedToken.user.persnum,
        decodedToken.user.firstName,
        decodedToken.user.lastName,
        decodedToken.user.email,
        decodedToken.user.description,
        +decodedToken.user.isTutor == 1,
        +decodedToken.user.semester);
    } {
      return new User(0, '', '', '', '', '', false, 0);
    }
  }



}
