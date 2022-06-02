import {Course, Slot, User} from "./course";
import {formatDate} from "@angular/common";

export class CourseFactory {

  static empty() : Course {
    return new Course(
      0,
      '',
      '',
      '',
      {id:0, persnum: '', firstName: '', lastName: '', email: '', description: '', isTutor: false , semester:0},
      0,
      [{id: 0, day: new Date(), from:'', to: '', isBooked: false}],  /*new Slot(0, new Date(), '', '', false)*/  /*{id: 0, day: new Date(), from:'', to:'',isBooked:false}*/
      [{id:0, url:'', title:''}],
      0,
      '',
      [{id:0, text:'', course_id:0, user_id:0, user: {id:0, persnum: '', firstName: '', lastName: '', email: '', description: '', isTutor: false, semester:0}}]);    /**/
  }

  static fromObject (rawCourse: any):Course{
    return new Course(
      rawCourse.id,
      rawCourse.cnum,
      rawCourse.title,
      rawCourse.description,
      rawCourse.user,
      rawCourse.user_id,
      rawCourse.slots,
      rawCourse.images,
      rawCourse.semester,
      rawCourse.professor,
      rawCourse.comments
    );
  }
}






