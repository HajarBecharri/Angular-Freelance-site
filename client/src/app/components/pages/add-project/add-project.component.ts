import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { ProjectService } from 'src/app/services/projects.service';
import { Cathegorie } from 'src/app/shared/models/Cathegorie';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  user!:any;
  name!:string;
  period!:number;
  budjet!:number;
  cathegories!:Cathegorie[];
  cathegorieId!:string;
  image!:string;
  clientId!:string;
  imageFile!:string;
  constructor(freelancerService:FreelancerService,
    private router:Router,
     private projectServices:ProjectService , private clientServices:ClientService)
     {
      let cathegoriObservable : Observable<any> ;
    freelancerService.freelancerObservable.subscribe((newFreelancer)=>
    this.user=newFreelancer)
    cathegoriObservable = this.projectServices.getAllCathegorie();
    cathegoriObservable.subscribe(serverCathegorie=>{
      this.cathegories = serverCathegorie;
    });
    this.clientServices.clientObservable.subscribe(client=>{
      this.clientId = client.id ;
    })
  }
  ngOnInit(): void { }


  onCategoryChange(event: Event){
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    console.log(value);
    this.cathegorieId = value ;
  }

  SelectedFile(event:any){
    this.image = event.target.files[0].name;
    this.imageFile = event.target.files[0];
    console.log(this.image);
  }
  Submit(){
    let formData = new FormData();
    formData.append('description', this.name);
    formData.append('budjet', this.budjet.toString());
    formData.append('period', this.period.toString());
    formData.append('cathegorieId', this.cathegorieId.toString());
    formData.append('clientId', this.clientId.toString());
    formData.append('imageFile', this.imageFile);
    formData.append('imageUrl', this.image);
 this.projectServices.AddProjct(formData).subscribe();
 this.router.navigateByUrl('deashbordClient')
  }
}
