import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  ngOnInit(): void {
  }
  projects!:any[];
  constructor(private projectservices:ProjectService){
    this.projectservices.getAll().subscribe((response:any)=>{
      this.projects = response ;
    });
  }

}
