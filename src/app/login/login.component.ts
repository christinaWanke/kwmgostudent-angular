import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {Course} from "../shared/course";
import {CourseArchiveService} from "../shared/course-archive.service";

interface Response{
  access_token: string;
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  course: Course | undefined;
  courses: Course[]=[];
  //user: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private cs: CourseArchiveService
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
    this.cs.getAll().subscribe(res =>this.courses = res);
  }



  login(){
    const val = this.loginForm.value;
    if(val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe((
        res: any) => {
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl("/");

      });
    }
  }

  logout(){
    return this.authService.logout();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getUser(){
    console.log(this.authService.getCurrentUser());
    return this.authService.getCurrentUser();
  }

  isTutor(){
    return this.authService.getCurrentUser().isTutor;
  }


}


















