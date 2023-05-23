import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private formBuilder:FormBuilder,private freelancerservice:FreelancerService,private clientservice:ClientService){

    freelancerservice.freelancerObservable.subscribe((newFreelancer)=>
  this.userf=newFreelancer)
  clientservice.clientObservable.subscribe((newClient)=>
  this.userc=newClient)

  }
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      lastname:['',Validators.required],
      firstname:['',Validators.required],
      gender:[''],
      age:['',Validators.required],
      status:[''],
      favorite:[''],
      hobies:[''],
      date:['']
    });

}

get fc() {
  return this.loginForm.controls; 
}
}
