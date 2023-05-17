import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

project!:Project;
  constructor(private activatedRoute:ActivatedRoute , private projectServices:ProjectService ){
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
