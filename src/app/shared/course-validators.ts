import {FormControl} from "@angular/forms";
import {CourseArchiveService} from "./course-archive.service";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

export class CourseValidators {
  static cnumExists(cs: CourseArchiveService){
    return function (control: FormControl): any{
      return cs.check(control.value).pipe(map(exists => !exists ? null : {cnumExists: {valid: false}}))
    }
  }
}
