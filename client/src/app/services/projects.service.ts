import { Injectable } from '@angular/core';
import { Project } from '../shared/models/Project';
import { Observable } from 'rxjs';
import { ADD_PROJECT, PROJECTS_URL } from '../shared/models/constantes/urs';
import { HttpClient } from '@angular/common/http';

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
}
