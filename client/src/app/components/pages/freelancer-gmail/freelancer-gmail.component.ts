import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-freelancer-gmail',
  templateUrl: './freelancer-gmail.component.html',
  styleUrls: ['./freelancer-gmail.component.css']
})
export class FreelancerGmailComponent {
  id_project!:string
  userc!:any
  userf!:any
  email!:string
  idd=0
  constructor(@Inject(MAT_DIALOG_DATA) public data:string,private dialogRef: MatDialogRef<FreelancerGmailComponent>,private Projectservice:ProjectService,private freelancerservice:FreelancerService,private clientservice:ClientService,private router:Router){
    this.id_project=data
    freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
    this.userf=newFreelancer)
    clientservice.clientObservable.subscribe((newClient)=>
    this.userc=newClient)

  }
submit(){
this.Projectservice.startProject(this.email,this.id_project).subscribe()
this.dialogRef.close()
}

}
