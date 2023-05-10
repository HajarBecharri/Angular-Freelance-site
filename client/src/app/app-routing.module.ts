import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HowWorkComponent } from './components/pages/how-work/how-work.component';
import { HomeComponent } from './components/pages/home/home.component';
import { GetIdeaComponent } from './components/pages/get-idea/get-idea.component';
import { AddProjectComponent } from './components/pages/add-project/add-project.component';
import { SignupComponent } from './components/pages/signup/signup.component';

const routes: Routes = [
  {path:'login/:user',component:LoginPageComponent},
  {path:'about',component:AboutComponent},
  {path:'how-work',component:HowWorkComponent},
  {path:'' ,component:HomeComponent},
  {path : 'cathegorie/:cte',component:HomeComponent},
  {path:'get_idea' , component:GetIdeaComponent},
  {path:'add_project' , component:AddProjectComponent},
  {path:'Register' , component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
