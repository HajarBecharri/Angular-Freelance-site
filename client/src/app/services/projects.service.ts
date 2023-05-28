import { Injectable } from '@angular/core';
import { Project } from '../shared/models/Project';
import { Observable, tap } from 'rxjs';
import { ADD_PROJECT, CATHEGORIES_URL, CATHEGORIE_URL, DONE_PROJECT_URL, GET_IDEA_URL, PROJECTS_URL, PROJECT_URL, START_PROJECT_URL } from '../shared/models/constantes/urs';
import { HttpClient } from '@angular/common/http';
import { Freelancer } from '../shared/models/Freelencer';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient,private toastrService:ToastrService) { }
  getAll(){
    return this.http.get(PROJECTS_URL);
  }
  SaveProject(name:string){
    return this.http.post(ADD_PROJECT,name);
  }
  getAllCathegorie(){
    return this.http.get(CATHEGORIES_URL);
  }
  getAllFoodsBycathegorie(cet:string){
    if(cet == 'all'){
      return this.getAll() ;
    }
    return this.http.get(CATHEGORIE_URL+ cet);
  }
   getIdea(){
    return this.http.get(GET_IDEA_URL);
   }
  getProjectById(id:string){
   return this.http.get(PROJECT_URL +id) ;
  }
  startProject(email_freelancer:string,id_project:string){
    return this.http.post(START_PROJECT_URL,{
      email_freelancer:email_freelancer,
      id_project:id_project
    }).pipe(
      tap({
        next:(user)=>{
        
             this.toastrService.success(
              `good job`,
              'start Successfully'
             )
        },
        error:(errorResponse)=>{
          this.toastrService.error(
            errorResponse.error,'start failed'
           )
        }
      })
     )
   ;
  }
  doneProject(id_freelancer:string):Observable<Freelancer>{
    return this.http.get<Freelancer>(DONE_PROJECT_URL + id_freelancer) ;
  }
}
