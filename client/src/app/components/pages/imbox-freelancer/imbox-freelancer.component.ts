import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ProjectService } from 'src/app/services/projects.service';



export interface PeriodicElement {
  budjet: string;
  periode: number;
  description:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {description: 'b', budjet: 'Hydrogen', periode: 1.0079},
  {description: 'a', budjet: 'Helium', periode: 4.0026},
  {description: 'c', budjet: 'Lithium', periode: 6.941},

];

@Component({
  selector: 'app-imbox-freelancer',
  templateUrl: './imbox-freelancer.component.html',
  styleUrls: ['./imbox-freelancer.component.css']
})
export class ImboxFreelancerComponent {
  displayedColumns: string[] = ['description', 'budjet', 'periode', 'en train'];
  dataSource = ELEMENT_DATA;
  done=false
  userf!:any;
  userc!:any;
constructor(private router:Router,private Projectservice:ProjectService,private clientservice:ClientService,private freelancerservice:FreelancerService  ){

  
  freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
  this.userf=newFreelancer)
  clientservice.clientObservable.subscribe((newClient)=>
  this.userc=newClient)
}


}
