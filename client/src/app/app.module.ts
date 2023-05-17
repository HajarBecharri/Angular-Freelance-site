import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/partials/title/title.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AboutComponent } from './components/pages/about/about.component';
import { HowWorkComponent } from './components/pages/how-work/how-work.component';
import { CompleteProfileComponent } from './components/pages/complete-profile/complete-profile.component'
import { HomeComponent } from './components/pages/home/home.component';
import { GetIdeaComponent } from './components/pages/get-idea/get-idea.component';
import { AddProjectComponent } from './components/pages/add-project/add-project.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { DeashbordFreelancerComponent } from './components/pages/deashbord-freelancer/deashbord-freelancer.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DeashbordClientComponent } from './components/pages/deashbord-client/deashbord-client.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import {MatIconModule} from '@angular/material/icon';
import { ProjectComponent } from './components/pages/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    TitleComponent,
    AboutComponent,
    HowWorkComponent,
    CompleteProfileComponent,
    HomeComponent,
    GetIdeaComponent,
    AddProjectComponent,
    SignupComponent,
    DeashbordFreelancerComponent,
    DeashbordClientComponent,
    ProfileComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
