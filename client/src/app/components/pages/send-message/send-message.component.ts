import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {

  dataMessage!:any
  userc!:any
  userf!:any
  message!:string
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<SendMessageComponent>,private freelancerservice:FreelancerService,private clientservice:ClientService,private router:Router){
    this.dataMessage=data
    freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
    this.userf=newFreelancer)
    clientservice.clientObservable.subscribe((newClient)=>
    this.userc=newClient)

  }

  submit(){
    if(this.userc.token){
    this.clientservice.sendMessage(this.message,this.data.id_sender,this.data.id_recipient).subscribe()
    this.dialogRef.close()
    }
    else if(this.userf.token){
      this.freelancerservice.sendMessage(this.message,this.data.id_sender,this.data.id_recipient).subscribe()
      this.dialogRef.close()
    }
  }

}
