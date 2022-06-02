import { Component } from '@angular/core';
import {Course} from "./shared/course";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  course: Course | undefined;

  constructor(private authService: AuthenticationService) {}

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    return this.isLoggedIn() ? "Logout" : "Login";
  }

  isTutor(){
    return this.authService.getCurrentUser().isTutor;
  }

  getName(){
    return this.authService.getCurrentUser().firstName;
  }
}
