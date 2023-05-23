import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { Freelancer } from 'src/app/shared/models/Freelencer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{

  freelancer!:Freelancer ;
  userf!:any
  userc!:any
  constructor(private activatedRoute:ActivatedRoute , private freelancerServices:FreelancerService ,private clientservices:ClientService){

  freelancerServices.freelancerObservable.subscribe((newFreelancer)=>
  this.userf=newFreelancer)
  clientservices.clientObservable.subscribe((newClient)=>
  this.userc=newClient)
  
  let freelancerObsevable : Observable<any> ;
    activatedRoute.params.subscribe((param)=>{
      freelancerObsevable =   this.freelancerServices.getFreelancer(param['name']);
    freelancerObsevable.subscribe(serverfreelancer=>{
      this.freelancer = serverfreelancer ;
      console.log(this.freelancer.project);
    })

  })
}
}


