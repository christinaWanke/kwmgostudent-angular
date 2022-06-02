export class User {
  constructor(public id: number,
              public persnum: string,
              public firstName: string,
              public lastName: string,
              public email: string,
              //public password: string,
              public description: string,
              public isTutor: boolean,
              public semester?: number) {
  }
}
