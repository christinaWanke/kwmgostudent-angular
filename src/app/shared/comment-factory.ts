import {Comment} from "./comment";
export {Comment} from "./comment";

export class CommentFactory {

  static empty() : Comment {
    return new Comment(0, '', 0,0, {id:0, persnum: '', firstName: '', lastName: '', email: '', description: '', isTutor: false, semester:0});
  }

  static fromObject(rawComment : any) : Comment {
    return new Comment(
      rawComment.id,
      rawComment.text,
      rawComment.course_id,
      rawComment.user_id,
      rawComment.user
    )
  }
}
