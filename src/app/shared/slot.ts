import {Course} from "./course";
export {Course} from "./course";
import { User } from "./user";
import {Time} from "@angular/common";
import {DatePipe} from "@angular/common";
export { User } from "./user";

export class Slot {
  constructor(public id: number,
              public day: Date,
              public from: string,
              public to: string,
              public isBooked: boolean,
              //public course_id:number
  ) {}
}
