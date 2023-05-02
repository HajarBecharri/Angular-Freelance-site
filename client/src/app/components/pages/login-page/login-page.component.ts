import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // for managing form inside angular 
  loginForm!:FormGroup;
  isSabmitted=false;
  returnUrl='';
  constructor(private formBuilder:FormBuilder,
    
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private freelencerService:FreelancerService,
    private clientService:ClientService){

  }
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
     //reurnUrl=/checkout
    //loginForm.control.email   to access to the email
    //we made get fc method to use simply
    //fc.email
    this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.loginForm.controls; 
  }
   
  submit(){
    this.isSabmitted=true;
    if(this.loginForm.invalid)return;

    this.activatedRoute.params.subscribe((params)=>{
      if(params['user']=='freelancer'){
      
      this.freelencerService.Login({email:this.fc.email.value,password:this.fc.password.value}).subscribe(()=>{
        this.router.navigateByUrl(this.returnUrl)
      }
      )


      }
      else if (params['user']=='client'){
        this.clientService.Login({email:this.fc.email.value,password:this.fc.password.value}).subscribe(()=>{
          this.router.navigateByUrl(this.returnUrl)
        })

      }

  })
  }
}
