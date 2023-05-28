import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { SendMessageComponent } from '../send-message/send-message.component';

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
  
  constructor(private _dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:string,private dialogRef: MatDialogRef<MessageSendersComponent>,private freelancerservice:FreelancerService,private clientservice:ClientService,private router:Router){
    this.id_reciever=data
    freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
    this.userf=newFreelancer)
    clientservice.clientObservable.subscribe((newClient)=>
    this.userc=newClient)
    if(this.userc.token){
    this.clientservice.getMessagesenders(this.id_reciever).subscribe((data)=>{
    this.senders=data
    console.log(this.senders[8]._id)
    }
   
  
    
    )
    }
    else if(this.userf.token){
      
      this.freelancerservice.getMessagesenders(this.id_reciever).subscribe((data)=>{
        this.senders=data
        
        console.log(this.senders[8].body)
        }
       
      
        
        )
    }

  }

  repondre(recipent:string){

    if(this.userc.token){
    this._dialog.open(SendMessageComponent,{
      data:{'id_recipient':recipent,'id_sender':this.userc.id}
    })}
    else if(this.userf.token){
      this._dialog.open(SendMessageComponent,{
        data:{'id_recipient':recipent,'id_sender':this.userf.id}
      })
    }
  
    this.dialogRef.close()

  }

}
