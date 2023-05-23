import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ProjectService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  userf!:any
  userc!:any
project!:Project;
  constructor(private activatedRoute:ActivatedRoute ,private freelancerservice:FreelancerService,private clientservice:ClientService, private projectServices:ProjectService ){
    freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
    this.userf=newFreelancer)
    clientservice.clientObservable.subscribe((newClient)=>
    this.userc=newClient)

    let projectObservable : Observable<any> ;
    activatedRoute.params.subscribe((param)=>{
      projectObservable =   this.projectServices.getProjectById(param['id']);
      projectObservable.subscribe(serverproject=>{
      this.project = serverproject ;
      console.log(this.project);
    })
})
  }
}
