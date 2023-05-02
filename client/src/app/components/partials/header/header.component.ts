import { Component, OnInit } from '@angular/core';
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
user!:any;

constructor(private freelancerService:FreelancerService,clientService:ClientService){
freelancerService.freelancerObservable.subscribe((newFreelancer)=>
this.user=newFreelancer)
clientService.clientObservable.subscribe((newClient)=>
this.user=newClient)
};
ngOnInit(): void {
  
}

logout():void{
  this.freelancerService.logout();
}

isAuth(){
  return this.user.token;
}


}
