export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const CourseFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Bitte einen Kurstitel angeben!'),
  new ErrorMessage('cnum', 'required', 'Bitte ein Kürzel für den Kurs eingeben!'),
  new ErrorMessage('cnum', 'minlength', 'Das Kürzel muss mindestens 2 Zeichen lang sein!'),
  new ErrorMessage('cnum', 'maxlength', 'Das Kürzel darf höchstens 6 Zeichen lang sein!'),
  new ErrorMessage('cnum', 'isbnExists', 'Das Kürzel existiert bereits'),
  new ErrorMessage('semester', 'min', 'Das Semester kann nicht kleiner als 1 sein!'),
  new ErrorMessage('semester', 'max', 'Das höchste Semester ist das 6.'),
  new ErrorMessage('images', 'required', 'Bitte füge ein Bild hinzu!')
];
