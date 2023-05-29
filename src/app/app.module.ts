import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'
import { CookieService } from 'ngx-cookie-service';

//Componenets
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component'
import { ErrorComponent } from './components/error/error.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { CreateComponent } from './components/create/create.component';
import { TemplateComponent } from './components/template/template.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';

//Material components module
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuard } from 'src/auth/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    ErrorComponent,
    SignupComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    CreateComponent,
    TemplateComponent,
    NotfoundComponent,
    CardDetailsComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),

    //material imports
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
