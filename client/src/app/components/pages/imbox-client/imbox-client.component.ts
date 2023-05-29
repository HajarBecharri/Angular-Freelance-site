import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ProjectService } from 'src/app/services/projects.service';
import { Client } from 'src/app/shared/models/Client';
import { FreelancerGmailComponent } from '../freelancer-gmail/freelancer-gmail.component';
import { Freelancer } from 'src/app/shared/models/Freelencer';
import { SendMessageComponent } from '../send-message/send-message.component';
import { PaimentComponent } from '../paiment/paiment.component';











@Component({
  selector: 'app-imbox-client',
  templateUrl: './imbox-client.component.html',
  styleUrls: ['./imbox-client.component.css']
})





export class ImboxClientComponent implements OnInit {
  displayedColumns: string[] = ['description', 'budjet', 'periode','freelancer','status'];
  dataSource!:Client[];
  userf!:any;
  userc!:any;
  email!:string;
  freelancer!:Freelancer
constructor(private _dialog:MatDialog,private Mydialog:MatDialog,private router:Router,private Projectservice:ProjectService,private clientservice:ClientService,private freelancerservice:FreelancerService ,private dialogRef: MatDialogRef<ImboxClientComponent> ){

  freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
  this.userf=newFreelancer)
  clientservice.clientObservable.subscribe((newClient)=>
  this.userc=newClient)
  if(this.userc){
  this.clientservice.ClientProject(this.userc._id).subscribe((data)=>{

    this.dataSource=data


  })

  }
}
  ngOnInit(): void {

  }


start(id:string){
  this._dialog.open(FreelancerGmailComponent,{
    data:id
  })
  this.dialogRef.close()

}
doneProject(id:string){
  this.Projectservice.doneProject(id).subscribe((data)=>
  window.location.reload()
)
}
getemail(id_freelancer:string){
  this.freelancerservice.getFreelancer(id_freelancer).subscribe((data)=>
  this.freelancer=data
  )
  return this.freelancer.email
}
messagerie(id_freelancer:string){
  this._dialog.open(SendMessageComponent,{
    data:{'id_recipient':id_freelancer,'id_sender':this.userc.id}
  })

  this.dialogRef.close()
}
paier(id:string){
  this.Mydialog.open(PaimentComponent,{
    data:id
  });
}

}
