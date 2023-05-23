import { Component } from '@angular/core';
import { freelancer_how, client_how } from '../../../data/data';

@Component({
  selector: 'app-how-work',
  templateUrl: './how-work.component.html',
  styleUrls: ['./how-work.component.css']
})
export class HowWorkComponent {
  data:any[]=client_how;
  freelancer_bgcolor:string="#1E90FF"
  client_bgcolor:string="white"
  freelancer_color:string="black"
  client_color:string="#1E90FF"


Freelancer_choice(){
  this.data=freelancer_how;
  this.freelancer_bgcolor="white"
  this.client_bgcolor="#1E90FF"

  this.freelancer_color="#1E90FF"
  this.client_color="black"
}

Client_choice(){
  this.data=client_how;
  this.client_bgcolor="white"
  this.freelancer_bgcolor="#1E90FF"

  this.client_color="#1E90FF"
  this.freelancer_color="black"
}

}
