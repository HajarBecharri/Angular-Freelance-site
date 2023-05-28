import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';

@Component({
  selector: 'app-message-senders',
  templateUrl: './message-senders.component.html',
  styleUrls: ['./message-senders.component.css']
})
export class MessageSendersComponent {
  id_reciever!:string
  userc!:any
  userf!:any
  email!:string
  senders!:any
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:string,private dialogRef: MatDialogRef<MessageSendersComponent>,private freelancerservice:FreelancerService,private clientservice:ClientService,private router:Router){
    this.id_reciever=data
    freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
    this.userf=newFreelancer)
    clientservice.clientObservable.subscribe((newClient)=>
    this.userc=newClient)
    if(this.userc.token){
    this.clientservice.getMessagesenders(this.id_reciever).subscribe((data)=>{
    this.senders=data
    
    }
   
  
    
    )
    }
    else if(this.userf.token){
      
      this.freelancerservice.getMessagesenders(this.id_reciever).subscribe((data)=>{
        this.senders=data
        console.log(data)
        
        }
       
      
        
        )
    }

  }

}
