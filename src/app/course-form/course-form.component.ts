import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseFactory} from "../shared/course-factory";
import {CourseArchiveService} from "../shared/course-archive.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../shared/course";
import {CourseFormErrorMessages} from "./course-form-error-messages";
import {CourseValidators} from "../shared/course-validators";
import {formatDate} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-course-form',
  templateUrl: './course-form.component.html'
})

export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  course = CourseFactory.empty();

  errors: {[key: string]: string} = {};

  isUpdatingCourse = false;
  slots: FormArray;
  images: FormArray;

  constructor(private fb: FormBuilder,
              private cs: CourseArchiveService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService)
  {
    this.courseForm = this.fb.group({});
    this.images = this.fb.array([]);
    this.slots = this.fb.array([]);
  }

  ngOnInit(): void {
    const cnum = this.route.snapshot.params["cnum"];
    if (cnum){
      this.isUpdatingCourse = true;
      this.cs.getSingle(cnum).subscribe(course => {
        this.course = course;
        this.initCourse();
      });
    }
    this.initCourse();
  }

  initCourse(){
    this.buildSlotsArray();
    this.buildThumbnailsArray();

    this.courseForm = this.fb.group({
      id: this.course.id,
      cnum: [
        this.course.cnum,[
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(6),
          //CourseValidators.cnumExists(this.cs)
        ]
      ],
      title: [this.course.title, Validators.required],
      description: this.course.description,
      semester: [
        this.course.semester, [
          Validators.min(1),
          Validators.max(6)
        ]
      ],
      professor: this.course.professor,
      slots: this.slots,
      images: this.images
    });

    this.courseForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  submitForm(){
    this.courseForm.value.images = this.courseForm.value.images.filter(
      (thumbnail: { url: string; }) => thumbnail.url
    );

    const course: Course = CourseFactory.fromObject(this.courseForm.value);

    //course.slots = this.course.slots;

    if (this.isUpdatingCourse){
      this.cs.update(course).subscribe(res => (
        this.router.navigate(['../../courses', course.cnum], {relativeTo: this.route})
      ));
    }
    else{
      course.user_id = this.authService.getCurrentUser().id;
      //this.course.user.id = 1;
      this.cs.create(course).subscribe(res => {
        this.course = CourseFactory.empty();
        this.courseForm.reset(CourseFactory.empty());
        this.router.navigate(["../courses"], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages(){
    console.log("Is invalid? " + this.courseForm.invalid);
    this.errors = {};

    for(const message of CourseFormErrorMessages){
      const control = this.courseForm.get(message.forControl);
      if(
        control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ){
        this.errors[message.forControl] = message.text;
      }
    }
    console.log(this.errors);
  }

  buildSlotsArray(){
    if (this.course.slots){
      this.slots = this.fb.array([]);
      for(let s of this.course.slots){
        let sg = this.fb.group({
          id: new FormControl(s.id),
          day: new FormControl(formatDate(new Date(s.day), 'yyyy-MM-dd', 'en')),   //formatDate(new Date(s.day), 'YYYY-MM-dd', 'en')
          from: new FormControl(s.from),
          to: new FormControl(s.to),
          isBooked: new FormControl(s.isBooked)
        });
        //console.log(s.from);
        //console.log(formatDate(new Date(s.day), 'dd.MM.YYYY', 'en'));

        this.slots.push(sg);
        console.log(this.course.slots);
      }
    }
  }

  addSlotsControl() {
    this.slots.push(this.fb.group({id: 0, day: null, from: null, to: null, isBooked: false}));
    console.log(this.slots);
  }

  buildThumbnailsArray(){
    if (this.course.images){
      this.images = this.fb.array([]);
      for(let img of this.course.images){
        let fg = this.fb.group({
          id: new FormControl(img.id),
          url: new FormControl(img.url),
          title: new FormControl(img.title),
        });
        this.images.push(fg);
      }
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({id:0, url: null, title: null}));
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
