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
  imageData!:string
  
  
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
      name:[''],
      image:['']
    });

}


get fc() {
  return this.loginForm.controls; 
}
onFileSelected(event:Event){
  // @ts-ignore: Object is possibly 'null'
   const file=(event.target as HTMLInputElement).files[0]
   this.loginForm.patchValue({image:file})
   const allowedFileTypes=["image/jpg","image/jpeg","image/png"]
   if(file && allowedFileTypes.includes(file.type)){
    const reader=new FileReader();
    reader.onload=()=>{
      this.imageData= reader.result as string
      console.log(this.imageData)
    }
    reader.readAsDataURL(file)

   }
   
}

submit(){
  
  if(this.userf.token){
  
    
  this.freelancerservice.completeProfile({emailsecondaire:this.fc.emailsecondaire.value,age:this.fc.age.value,id:this.userf.id,firstname:this.fc.firstname.value,lastname:this.fc.lastname.value,motivations:this.fc.motivations.value,name:this.fc.name.value}).subscribe()
  this.router.navigateByUrl("deashbordFreelencer")
  this.imageData=""
  this.loginForm.reset()
  this.dialogRef.close();
}
  else if(this.userc.token){
    this.clientservice.completeProfile({emailsecondaire:this.fc.emailsecondaire.value,age:this.fc.age.value,id:this.userc.id,firstname:this.fc.firstname.value,lastname:this.fc.lastname.value,name:this.fc.name.value}).subscribe()
    this.dialogRef.close();
  }
  
    
  
     


    }}

