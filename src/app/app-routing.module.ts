import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuard } from 'src/auth/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { ViewarticleComponent } from './components/viewarticle/viewarticle.component';
import { QapoolComponent } from './components/qapool/qapool.component';
import { QapendingComponent } from './components/qapending/qapending.component';
import { QacompleteComponent } from './components/qacomplete/qacomplete.component';
import { QaeditComponent } from './components/qaedit/qaedit.component';
import { MyarticlesComponent } from './components/myarticles/myarticles.component';
import { CrpoolComponent } from './components/crpool/crpool.component';
import { CrpendingComponent } from './components/crpending/crpending.component';
import { QatrackingComponent } from './components/qatracking/qatracking.component';


const routes: Routes = [
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'about', component:HomeComponent},
  {path: 'contact', component:HomeComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'create', component:CreateComponent, canActivate: [AuthGuard], data: {allowedUserTypes: [1,2]}},
  {path: 'unauthorized', component:UnauthorizedComponent},
  {path: 'notfound', component:NotfoundComponent},
  {path: 'archives', component:ArchivesComponent},
  {path: 'viewarticle', component:ViewarticleComponent},
  {path: 'qapool', component:QapoolComponent},
  {path: 'qapending', component:QapendingComponent},
  {path: 'qacomplete', component:QacompleteComponent},
  {path: 'qaedit', component:QaeditComponent},
  {path: 'myarticles', component:MyarticlesComponent},
  {path: 'crpool', component:CrpoolComponent},
  {path: 'crpending', component:CrpendingComponent},
  {path: 'qatracking', component:QatrackingComponent},

  //The error route must be last route
  // {path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
