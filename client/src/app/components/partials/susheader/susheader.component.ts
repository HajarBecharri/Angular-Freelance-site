import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompleteMyProfileComponent } from '../../pages/complete-my-profile/complete-my-profile.component';
import { ImboxClientComponent } from '../../pages/imbox-client/imbox-client.component';
import { ImboxFreelancerComponent } from '../../pages/imbox-freelancer/imbox-freelancer.component';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-susheader',
  templateUrl: './susheader.component.html',
  styleUrls: ['./susheader.component.css']
})
export class SusheaderComponent {
  client=true
  userf!:any
  userc!:any
constructor(private _dialog:MatDialog,private freelancerservice:FreelancerService,private clientservice:ClientService,private router:Router){
  freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
  this.userf=newFreelancer)
  clientservice.clientObservable.subscribe((newClient)=>
  this.userc=newClient)
}
openCompleteProfileForm(){
  this._dialog.open(CompleteMyProfileComponent)
}
imbox(){
  if( this.userc.token)
  this._dialog.open(ImboxClientComponent)
  else if( this.userf.token) 
  this._dialog.open(ImboxFreelancerComponent)

}

deashbord(){
  if( this.userc.token)
  this.router.navigateByUrl('deashbordClient')
  else if( this.userf.token)
  this.router.navigateByUrl('deashbordFreelencer')
}
about(){
  this.router.navigateByUrl('about')
}
getStarted(){
  this.router.navigateByUrl('how-work')
}
}
