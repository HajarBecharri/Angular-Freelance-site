import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HowWorkComponent } from './components/pages/how-work/how-work.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {path:'login/:user',component:LoginPageComponent},
  {path:'about',component:AboutComponent},
  {path:'how-work',component:HowWorkComponent},
  {path:'' , component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
