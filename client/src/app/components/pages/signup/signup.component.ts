import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { IuserRegister } from 'src/app/shared/models/interfaces/IuserRegister';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted = false;


  constructor(private formbuilder :FormBuilder , private freelancerservices:FreelancerService ,
     private activatedRoute:ActivatedRoute ,
      private clientservices:ClientService,
      private router:Router){
  }
  ngOnInit(): void {

    this.registerForm = this.formbuilder.group({
      email :['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required]]
    })

  }
  get fc(){
    return this.registerForm.controls ;
  }

  submit(){
    this.isSubmitted = true ;
    if(this.registerForm.invalid) return;

    const fv = this.registerForm.value;

    const user :IuserRegister ={
      email:fv.email,
      password:fv.password
    }
    console.log(user);

    this.activatedRoute.params.subscribe(param=>{
     let parmUrl = param['user'] ;
     console.log(parmUrl);
     if(parmUrl == 'freelancer'){
      this.freelancerservices.register(user).subscribe(_=>{
       this.router.navigate(["/login/freelancer"]);
      })
     }
     else{
      this.clientservices.register(user).subscribe(()=>{
        this.router.navigate(["/login/client"]);
      })
     }
    })
  }
}
