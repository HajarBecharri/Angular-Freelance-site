import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ProjectService } from 'src/app/services/projects.service';
import { Freelancer } from 'src/app/shared/models/Freelencer';
import { SendMessageComponent } from '../send-message/send-message.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



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
  displayedColumns: string[] = ['description', 'budjet', 'periode', 'status'];
  dataSource !: Freelancer[]
  done=false
  userf!:any;
  userc!:any;
constructor(private _dialog:MatDialog,private router:Router,private Projectservice:ProjectService,private clientservice:ClientService,private freelancerservice:FreelancerService ,private dialogRef: MatDialogRef<ImboxFreelancerComponent> ){

  
  freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
  this.userf=newFreelancer)
  clientservice.clientObservable.subscribe((newClient)=>
  this.userc=newClient)
  if(this.userf){
  this.freelancerservice.FreelancerProject(this.userf._id).subscribe((data)=>{
    console.log(data)
    this.dataSource=data
  
    
  })
}
}

messagerie(id_client:string){
  this._dialog.open(SendMessageComponent,{
    data:{'id_recipient':id_client,'id_sender':this.userf.id}
  })

  this.dialogRef.close()
}


}
