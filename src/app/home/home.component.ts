import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-home',
  template: `
    <div class="hero-image-standard">
      <div class="hero-text">
        <h1 class="ui centered row">Willkommen bei KWM GO Student!</h1><br>
        <p class="ui centered grid">Suche dir einen Kurs und buche ihn. Alles was du tun musst ist dich einloggen!!</p><br><br>
        <a *ngIf="!isLoggedIn()" class="ui centered inverted row purple button" routerLink="../login">Zum Login</a>
      </div>
    </div>

    <div class="ui center aligned basic segment">

      <a routerLink="../courses">
      <div class="ui purple labeled icon button">

        Überblick der Kurse
        <i class="right arrow icon"></i>
      </div>
      </a>
    </div>

  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
