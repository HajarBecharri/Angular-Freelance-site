import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  user!:any;
  constructor(private freelancerService:FreelancerService,clientService:ClientService , private router:Router){
    freelancerService.freelancerObservable.subscribe((newFreelancer)=>
    this.user=newFreelancer)
    clientService.clientObservable.subscribe((newClient)=>
    this.user=newClient )
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  UserExiste(){
    if(!this.user.token)
    this.router.navigate(["/login/:user"]);
    else
    this.router.navigate(["/"]);
  }
}
