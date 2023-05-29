import { Injectable } from '@angular/core';
import{BehaviorSubject,Observable, tap} from 'rxjs'
import { Freelancer } from '../shared/models/Freelencer';
import { IuserLogin } from '../shared/models/interfaces/IuserLogin';
import {HttpClient} from '@angular/common/http'
import { FREELANCER_COMPLETE_URL, FREELANCER_LOGIN_URL,FREELANCER_REGISTER_URL, FREELANCER_PROJECT_URL, FREELANCER_URL, GET_FREELANCER_URL, RCIEVEMESSAGE_FREELANCER_URL, SENDMESSAGE_FREELANCER_URL } from '../shared/models/constantes/urs';
import { ToastrService } from 'ngx-toastr';
import { Ifreelancer } from '../shared/models/interfaces/Ifreelancer';


import { IuserRegister } from '../shared/models/interfaces/IuserRegister';

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
        `Welcome to near | ${User.email}`,
        'Login Successful'
      )
        },
        error:(errorResponce)=>{
          this.toastrService.error(errorResponce.error,'Login Failed')
        }
      })
    );

   }
   completeProfile(freelancer:Ifreelancer){
     console.log(freelancer)
    return this.http.post(FREELANCER_COMPLETE_URL,freelancer).pipe(
      tap({
        next:(user)=>{
        
             this.toastrService.success(
              `done`,
              'send Successfully'
             )
        },
        error:(errorResponse)=>{
          this.toastrService.error(
            errorResponse.error,'try again'
           )
        }
      }))}

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
  getFreelancer(freelancer_id:string):Observable<Freelancer>{
    return this.http.get<Freelancer>(GET_FREELANCER_URL+ freelancer_id);
  }

  FreelancerProject(idFreelancer:string):Observable<Freelancer[]>{
    return this.http.get<Freelancer[]>(FREELANCER_PROJECT_URL + idFreelancer)
  }

  sendMessage(body:string,id_freelancer:string,id_client:string){
    return this.http.post(SENDMESSAGE_FREELANCER_URL,{
      body:body,
      id_client:id_client,
      id_freelancer:id_freelancer
    }).pipe(
      tap({
        next:(user)=>{

             this.toastrService.success(
              `done`,
              'send Successfully'
             )
        },
        error:(errorResponse)=>{
          this.toastrService.error(
            errorResponse.error,'try again'
           )
        }
      }))
  }

  getMessagesenders(idFreelancer:string){
    return this.http.get(RCIEVEMESSAGE_FREELANCER_URL+idFreelancer)
  }

  register(freelancerRegister:IuserRegister){
    console.log('hello free');
    return this.http.post(FREELANCER_REGISTER_URL,freelancerRegister).pipe(
      tap({
        next:(User:any)=>{
      this.setFreelancerTolocalStorage(User);
        },
        error:(errorResponce)=>{
          this.toastrService.error(errorResponce.error,'Sign up echoiee')
        }
      })
    )
}

}

