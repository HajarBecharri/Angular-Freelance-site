import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  ngOnInit(): void {
  }
  projects!:any;
  cathegories!:any ;
  constructor(private projectservices:ProjectService , private activatedRoute:ActivatedRoute){
    let projectObsevable , cathegorieObservable : Observable<any> ;
    activatedRoute.params.subscribe((param)=>{
      if(param['id']){
      projectObsevable =   this.projectservices.getAllFoodsBycathegorieId(param['id']);
    }
      else{
      projectObsevable  =   this.projectservices.getAll();
    }
    cathegorieObservable = this.projectservices.getAllCathegorie();
      projectObsevable.subscribe(serverprojects=>{
        this.projects = serverprojects ;
        console.log(this.projects);
      })
      cathegorieObservable.subscribe(serverCathegories=>{
        this.cathegories = serverCathegories;
      })
     })
  }

}
