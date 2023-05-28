import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { Freelancer } from 'src/app/shared/models/Freelencer';

@Component({
  selector: 'app-complete-my-profile',
  templateUrl: './complete-my-profile.component.html',
  styleUrls: ['./complete-my-profile.component.css']
})
export class CompleteMyProfileComponent {
  loginForm!:FormGroup;
  userf!:any
  userc!:any
  
  constructor(private dialogRef: MatDialogRef<CompleteMyProfileComponent>,private formBuilder:FormBuilder,private freelancerservice:FreelancerService,private clientservice:ClientService,private router:Router){

    freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
  this.userf=newFreelancer)
  clientservice.clientObservable.subscribe((newClient)=>
  this.userc=newClient)

  }
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      emailsecondaire:['',[Validators.required,Validators.email]],
      lastname:['',Validators.required],
      firstname:['',Validators.required],
      age:['',Validators.required],
      motivations:[''],
    });

}


get fc() {
  return this.loginForm.controls; 
}


submit(){
  if(this.loginForm.invalid)return;
  if(this.userf.token){this.freelancerservice.completeProfile({emailsecondaire:this.fc.emailsecondaire.value,age:this.fc.age.value,id:this.userf.id,firstname:this.fc.firstname.value,lastname:this.fc.lastname.value,motivations:this.fc.motivations.value}).subscribe()
  this.router.navigateByUrl("deashbordFreelencer")
  this.dialogRef.close();
}
  else if(this.userc.token){
    this.clientservice.completeProfile({emailsecondaire:this.fc.emailsecondaire.value,age:this.fc.age.value,id:this.userc.id,firstname:this.fc.firstname.value,lastname:this.fc.lastname.value}).subscribe()
    this.dialogRef.close();
  }
  
    
  
     


    }}

