import { Injectable } from '@angular/core';
import{BehaviorSubject,Observable, tap} from 'rxjs'
import { Freelancer } from '../shared/models/Freelencer';
import { IuserLogin } from '../shared/models/interfaces/IuserLogin';
import {HttpClient} from '@angular/common/http'
import { FREELANCER_LOGIN_URL } from '../shared/models/constantes/urs';
import { ToastrService } from 'ngx-toastr';

const FREELANCER_KEY='freelancer'
@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private freelancerSubject= new BehaviorSubject<Freelancer>(this.getFreelancerFromLocalStorage());
  public freelancerObservable:Observable<Freelancer>;

  constructor(private http:HttpClient,private toastrService:ToastrService) {
    this.freelancerObservable=this.freelancerSubject.asObservable();
   }


  Login(userLogin:IuserLogin):Observable<Freelancer>{
     
    return this.http.post<Freelancer>(FREELANCER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(User)=>{
      this.setFreelancerTolocalStorage(User);
      //we need to import Module (install ngx-toastr) , BrowserAnimationModule, and Adding style in angular.json
      this.freelancerSubject.next(User);
      this.toastrService.success(
        `Welcome to food ${User.name}`,
        'Login Successful'
      )
        },
        error:(errorResponce)=>{
          this.toastrService.error(errorResponce.error,'Login Failed')
        }
      })
    );

   }

   private setFreelancerTolocalStorage(freelancer:Freelancer){
    localStorage.setItem(FREELANCER_KEY,JSON.stringify(freelancer));
  
  }

   private getFreelancerFromLocalStorage():Freelancer{
    const userJson=localStorage.getItem(FREELANCER_KEY)
    if(userJson) return JSON.parse(userJson)as Freelancer;
    return new Freelancer();
  }

  logout(){
    this.freelancerSubject.next(new Freelancer());
    localStorage.removeItem(FREELANCER_KEY);
    //to refresh the page
    window.location.reload();
  }
}


