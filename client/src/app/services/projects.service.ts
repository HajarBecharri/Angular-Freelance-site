import { Injectable } from '@angular/core';
import { Project } from '../shared/models/Project';
import { Observable } from 'rxjs';
import { ADD_PROJECT, ADD_PROJECT_URL, CATHEGORIES_URL, CATHEGORIE_URL, GET_IDEA_URL, PROJECTS_URL, PROJECT_URL } from '../shared/models/constantes/urs';
import { HttpClient } from '@angular/common/http';
import { Cathegorie } from '../shared/models/Cathegorie';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient) { }
  getAll(){
    return this.http.get(PROJECTS_URL);
  }
  SaveProject(name:string){
    return this.http.post(ADD_PROJECT,name);
  }
  getAllCathegorie(){
    return this.http.get(CATHEGORIES_URL);
  }
  getAllFoodsBycathegorieId(id:string){
    if(id == 'all'){
      return this.getAll() ;
    }
    return this.http.get(CATHEGORIE_URL+ id);
  }
   getIdea(){
    return this.http.get(GET_IDEA_URL);
   }
  getProjectById(id:string){
   return this.http.get(PROJECT_URL +id) ;
  }
   AddProjct(project:FormData){
    return this.http.post(ADD_PROJECT_URL,project);
   }
}
