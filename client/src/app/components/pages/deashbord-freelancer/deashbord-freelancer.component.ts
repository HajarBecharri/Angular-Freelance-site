import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-deashbord-freelancer',
  templateUrl: './deashbord-freelancer.component.html',
  styleUrls: ['./deashbord-freelancer.component.css']
})
export class DeashbordFreelancerComponent {

  projects!:any;
  constructor(private projectservices:ProjectService ){
    let projectObsevable : Observable<any> ;
    projectObsevable  =   this.projectservices.getAll();
    projectObsevable.subscribe(serverprojects=>{
      this.projects = serverprojects ;
    })
  }

}
