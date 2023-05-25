import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {

    this.registerForm = this.formbuilder.group({
      email :['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required]]
    })

  }

  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '' ;

  constructor(private formbuilder :FormBuilder , private freelancerservices:FreelancerService , private activatedRoute:ActivatedRoute , private clientservices:ClientService){



  }

}
