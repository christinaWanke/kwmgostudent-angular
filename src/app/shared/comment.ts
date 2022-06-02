import {User} from "./user";
export {User} from "./user";
import {Course} from "./course";
export {Course} from "./course";

export class Comment {
  constructor(
    public id: number,
    public text: string,
    public course_id: number,
    public user_id: number,
    public user?: User
  ) {}
}
