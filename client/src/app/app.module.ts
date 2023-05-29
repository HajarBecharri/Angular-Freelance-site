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
import { HomeComponent } from './components/pages/home/home.component';
import { GetIdeaComponent } from './components/pages/get-idea/get-idea.component';
import { AddProjectComponent } from './components/pages/add-project/add-project.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { DeashbordFreelancerComponent } from './components/pages/deashbord-freelancer/deashbord-freelancer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import{MatMenuModule}from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import{MatNativeDateModule} from '@angular/material/core';
import{MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DeashbordClientComponent } from './components/pages/deashbord-client/deashbord-client.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import {MatIconModule} from '@angular/material/icon';
import { ProjectComponent } from './components/pages/project/project.component';
import { CompleteMyProfileComponent } from './components/pages/complete-my-profile/complete-my-profile.component';
import { SusheaderComponent } from './components/partials/susheader/susheader.component';
import { ImboxFreelancerComponent } from './components/pages/imbox-freelancer/imbox-freelancer.component';
import { ImboxClientComponent } from './components/pages/imbox-client/imbox-client.component';
import { MatTableModule } from '@angular/material/table';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { FreelancerGmailComponent } from './components/pages/freelancer-gmail/freelancer-gmail.component';
import { SendMessageComponent } from './components/pages/send-message/send-message.component' ;
import {MatBadgeModule} from '@angular/material/badge';
import { MessageSendersComponent } from './components/pages/message-senders/message-senders.component';
import { MessagesComponent } from './components/pages/messages/messages.component';
import { PaimentComponent } from './components/pages/paiment/paiment.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    TitleComponent,
    AboutComponent,
    HowWorkComponent,
    HomeComponent,
    GetIdeaComponent,
    AddProjectComponent,
    SignupComponent,
    DeashbordFreelancerComponent,
    DeashbordClientComponent,
    ProfileComponent,
    ProjectComponent,
    CompleteMyProfileComponent,
    SusheaderComponent,
    ImboxFreelancerComponent,
    ImboxClientComponent,
    NotFoundComponent,
    FreelancerGmailComponent,
    SendMessageComponent,
    MessageSendersComponent,
    MessagesComponent,
    PaimentComponent,
    
    
    
    
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
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTableModule,
    MatBadgeModule


    
    




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
