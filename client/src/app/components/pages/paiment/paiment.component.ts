import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';

declare var paypal:any;
@Component({
  selector: 'app-paiment',
  templateUrl: './paiment.component.html',
  styleUrls: ['./paiment.component.css']
})
export class PaimentComponent implements OnInit {
  project!:any;
  id!:string;
  @ViewChild('paypal' , {static:true})
  paypalElement!:ElementRef ;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any , private projectServices:ProjectService ,private router:Router,private toastrService:ToastrService){
   this.id = this.data ;
   this.projectServices.getProject(this.id).subscribe((data)=>{
    this.project =  data
   });
  }
  ngOnInit(): void {

    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: self.project.budjet,
              },
            },
          ],
        });
      },
      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.project.paimentId = payment.id;
        self.projectServices.pay(this.project).subscribe(
          {
            next: () => {
              this.toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );
            },
            error: () => {
              this.toastrService.error('Payment Save Failed', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrService.error('Payment Failed', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }


}
