import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ProjectService } from 'src/app/services/projects.service';



export interface PeriodicElement {
  
 description: string;
  budjet: number;
  periode: number;
  done:boolean
  
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {description: 'b', budjet: 1000, periode: 1.0079, done:true },
  {description: 'h', budjet: 1000,periode: 4.0026 ,done:false},
  {description: 'h', budjet: 1000, periode: 6.941, done:true},
  
  
];







@Component({
  selector: 'app-imbox-client',
  templateUrl: './imbox-client.component.html',
  styleUrls: ['./imbox-client.component.css']
})





export class ImboxClientComponent {
  displayedColumns: string[] = ['description', 'budjet', 'periode', 'start','done'];
  dataSource = ELEMENT_DATA;
  strt=false
  done=false
  userf!:any;
  userc!:any;
constructor(private router:Router,private Projectservice:ProjectService,private clientservice:ClientService,private freelancerservice:FreelancerService  ){

  freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
  this.userf=newFreelancer)
  clientservice.clientObservable.subscribe((newClient)=>
  this.userc=newClient)
}

start(){
this.strt=true
}
doneProject(){
this.done=true
}
  
}
