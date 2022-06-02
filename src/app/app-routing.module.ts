import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {CourseFormComponent} from "./course-form/course-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";



const routes: Routes =[
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path: 'courses', component:CourseListComponent},
  {path: 'courses/:cnum', component:CourseDetailsComponent},
  {path: 'tutor', component: CourseFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'tutor/:cnum', component: CourseFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[CanNavigateToAdminGuard]

})

export class AppRoutingModule { }
