import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-deashbord-client',
  templateUrl: './deashbord-client.component.html',
  styleUrls: ['./deashbord-client.component.css']
})
export class DeashbordClientComponent {
  projects!:any ;
  constructor( private projectservices:ProjectService){
       let projectObservable : Observable<any> ;

       projectObservable = this.projectservices.getIdea() ;

       projectObservable.subscribe((serverProject)=>{
        this.projects = serverProject ;
       })
  }
}
