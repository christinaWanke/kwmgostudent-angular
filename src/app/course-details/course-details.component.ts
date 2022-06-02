import {Component, OnInit} from '@angular/core';
import {Comment, Course} from "../shared/course";
import {CourseArchiveService} from "../shared/course-archive.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseFactory} from "../shared/course-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentFactory} from "../shared/comment-factory";


@Component({
  selector: 'bs-course-details',
  templateUrl: './course-details.component.html',
  styles: []
})

export class CourseDetailsComponent implements OnInit{

  course: Course = CourseFactory.empty();
  comment: Comment = CommentFactory.empty();
  commentForm : FormGroup;
  isUpdatingComment = false;


  constructor(private cs: CourseArchiveService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {
    this.commentForm = this.fb.group({});
  }

  ngOnInit() {
    this.initCourse();
    if (this.isLoggedIn()){
      this.initComment();
    }
  }

  initCourse(){
    const params = this.route.snapshot.params;
    this.cs.getSingle(params['cnum']).subscribe(c => this.course = c);
  }

  initComment(){
    if(this.isLoggedIn()) {
      this.commentForm = this.fb.group({
        id: this.comment.id,
        text: this.comment.text,
      });
    }
  }


  removeCourse(){
    if (confirm('Kurs wirklich löschen?')){
      this.cs.remove(this.course.cnum).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  isTutor(){
    return this.authService.getCurrentUser().isTutor;
  }

  userID(){
    return this.authService.getCurrentUser().id;
  }

  currentUser(){
    return this.authService.getCurrentUser();
  }

  setBooked(i: number) {
    this.course.slots[i].isBooked = true;
    this.cs.update(this.course).subscribe(res => this.course = res);
  }

  submitComment(){
    console.log(this.comment.user);
    if(this.isLoggedIn()) {
      const comment: Comment = CommentFactory.fromObject(this.commentForm.value);
      if (this.isUpdatingComment) {
        this.cs.updateComment(comment).subscribe(res => {
          this.commentForm.reset(CommentFactory.empty());
          this.initCourse();
        });
      } else {
        comment.course_id = this.course.id;
        comment.user_id = this.authService.getCurrentUser().id;

        this.cs.createComment(comment).subscribe(res => {
          console.log(comment);
          this.comment = CommentFactory.empty();
          this.commentForm.reset(CommentFactory.empty());

          this.initCourse();
        });

      }
    }
  }

  removeComment(user_id : number, id : number){
    if(this.isLoggedIn() && this.userID() === user_id){
      if(confirm('Soll das Kommentar wirklich gelöscht werden?')){
        this.cs.removeComment(id).subscribe(res => {
          this.initCourse();
        });
      }
    }
  }






}
