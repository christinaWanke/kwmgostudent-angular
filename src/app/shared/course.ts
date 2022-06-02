import { Image } from "./image";
export { Image } from "./image";
import { User } from "./user";
export { User } from "./user";
import { Slot } from "./slot";
import {Comment} from "./comment";
export {Comment} from "./comment";
export { Slot } from "./slot";

export class Course {
  constructor(public id: number,
              public cnum: string,
              public title: string,
              public description: string,
              public user: User,
              public user_id: number,
              public slots: Slot[],
              public images?: Image[],
              public semester?: number,
              public professor?: string,
              public comments?: Comment[],
              ) {}
}
