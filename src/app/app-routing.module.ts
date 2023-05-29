import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component'
import { ErrorComponent } from './components/error/error.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuard } from 'src/auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'homepage', component:HomepageComponent},
  {path: 'home', component:HomeComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'about', component:HomepageComponent},
  {path: 'contact', component:HomepageComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'create', component:CreateComponent, canActivate: [AuthGuard], data: {allowedUserTypes: [1,2]}},
  {path: 'unauthorized', component:UnauthorizedComponent},
  //The error route must be last route
  {path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
