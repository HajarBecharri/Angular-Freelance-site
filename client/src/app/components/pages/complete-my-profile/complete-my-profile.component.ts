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
  image!:string;
  imageFile!:string

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
      motivations:['',Validators.required],
      name:['',Validators.required],
      image:[''],
      compteBanquaire:['',Validators.required],
      phone:['',Validators.required],
    });

}


get fc() {
  return this.loginForm.controls;
}
onFileSelected(event:Event){
  // @ts-ignore: Object is possibly 'null'
   const file=(event.target as HTMLInputElement).files[0]
   // @ts-ignore: Object is possibly 'null'
   this.image = event.target.files[0].name;
   // @ts-ignore: Object is possibly 'null'
   this.imageFile = event.target.files[0];
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
let formData = new FormData() ;
formData.append('emailsecondaire', this.fc.emailsecondaire.value);
formData.append('age', this.fc.age.value);
formData.append('id', this.userf.id);
formData.append('firstname', this.fc.firstname.value);
formData.append('lastname', this.fc.lastname.value);
formData.append('motivations',this.fc.motivations.value);
formData.append('phone',this.fc.phone.value);
formData.append('compteBanquaire',this.fc.compteBanquaire.value);
formData.append('name',this.fc.name.value);
formData.append('imageFile', this.imageFile);
formData.append('imageUrl', this.image);

  this.freelancerservice.completeProfile(formData).subscribe()
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

