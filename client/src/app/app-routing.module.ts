import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HowWorkComponent } from './components/pages/how-work/how-work.component';
import { HomeComponent } from './components/pages/home/home.component';
import { GetIdeaComponent } from './components/pages/get-idea/get-idea.component';
import { AddProjectComponent } from './components/pages/add-project/add-project.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { DeashbordFreelancerComponent } from './components/pages/deashbord-freelancer/deashbord-freelancer.component';
import { DeashbordClientComponent } from './components/pages/deashbord-client/deashbord-client.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ProjectComponent } from './components/pages/project/project.component';
import { CompleteMyProfileComponent } from './components/pages/complete-my-profile/complete-my-profile.component';
import { ImboxFreelancerComponent } from './components/pages/imbox-freelancer/imbox-freelancer.component';
import { ImboxClientComponent } from './components/pages/imbox-client/imbox-client.component';


const routes: Routes = [
  {path:'login/:user',component:LoginPageComponent},
  {path:'about',component:AboutComponent},
  {path:'how-work',component:HowWorkComponent},
  {path:'' ,component:HomeComponent},
  {path : 'cathegorie/:cte',component:HomeComponent},
  {path:'get_idea' , component:GetIdeaComponent},
  {path:'add_project' , component:AddProjectComponent},
  {path:'Register' , component:SignupComponent},
  {path:'deashbordFreelencer' , component:DeashbordFreelancerComponent},
  {path:'deashbordClient',component:DeashbordClientComponent},
  {path: 'freelancer/:name' , component:ProfileComponent },
  {path:'project/:id' , component:ProjectComponent},
  {path:'complete',component:CompleteMyProfileComponent},
  {path:'project/imbox/freelancer' , component:ImboxFreelancerComponent},
  {path:'project/imbox/client' , component:ImboxClientComponent},
  {path:'Register/:user',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
