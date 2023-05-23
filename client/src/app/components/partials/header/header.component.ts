import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { Client } from 'src/app/shared/models/Client';
import { Freelancer } from 'src/app/shared/models/Freelencer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
userf!:any;
userc!:any;

constructor(private freelancerService:FreelancerService,private clientService:ClientService,private router:Router){
freelancerService.freelancerObservable.subscribe((newFreelancer)=>
this.userf=newFreelancer)
clientService.clientObservable.subscribe((newClient)=>
this.userc=newClient)
};
ngOnInit(): void {
  
}

logout():void{
  if(this.userf.token)
  this.freelancerService.logout();
  else if(this.userc.token)
  this.clientService.logout();
}

isAuth(){
  if(this.userf.token)
  return this.userf.token;
  else if(this.userc.token)
  return this.userc.token;
  else return ''
}




}
