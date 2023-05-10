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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    TitleComponent,
    AboutComponent,
    HowWorkComponent,
    CompleteProfileComponent,
    HomeComponent
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
