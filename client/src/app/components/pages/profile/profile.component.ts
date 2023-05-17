import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { Freelancer } from 'src/app/shared/models/Freelencer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{

  freelancer!:Freelancer ;

  constructor(private activatedRoute:ActivatedRoute , private freelancerServices:FreelancerService ){
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


