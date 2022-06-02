import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Course, Slot, User, Image} from "../shared/course";
import {DatePipe} from "@angular/common";
import {CourseArchiveService} from "../shared/course-archive.service";
import {AuthenticationService} from "../shared/authentication.service";


@Component({
  selector: 'bs-course-list',
  templateUrl: './course-list.component.html',
  styles: [
  ]
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];


  constructor(
    private cs: CourseArchiveService) { }

  ngOnInit(): void {
    this.cs.getAll().subscribe(res => this.courses = res);
    console.log(this.courses);
  }

}
