import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-get-idea',
  templateUrl: './get-idea.component.html',
  styleUrls: ['./get-idea.component.css']
})
export class GetIdeaComponent implements OnInit{
  ngOnInit(): void {
  }
  projects!:any ;
  constructor( private projectservices:ProjectService){
       let projectObservable : Observable<any> ;

       projectObservable = this.projectservices.getIdea() ;

       projectObservable.subscribe((serverProject)=>{
        this.projects = serverProject ;
       })
  }

}
