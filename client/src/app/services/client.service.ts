import { Injectable } from '@angular/core';
import{BehaviorSubject,Observable, tap} from 'rxjs'
import { Client } from '../shared/models/Client';
import { IuserLogin } from '../shared/models/interfaces/IuserLogin';
import {HttpClient} from '@angular/common/http'
import { CLIENT_COMPLETE_URL,CLIENT_REGISTER_URL , CLIENT_LOGIN_URL, CLIENT_PROJECT_URL, RCIEVEMESSAGE_CLIENT_URL, SENDMESSAGE_CLIENT_URL } from '../shared/models/constantes/urs';
import { ToastrService } from 'ngx-toastr';
import { Ifreelancer } from '../shared/models/interfaces/Ifreelancer';
import { Iclient } from '../shared/models/interfaces/Iclient';


import { IuserRegister } from '../shared/models/interfaces/IuserRegister';
import { Router } from '@angular/router';

const CLIENT_KEY='client'
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientSubject= new BehaviorSubject<Client>(this.getclientFromLocalStorage());
  public clientObservable:Observable<Client> ;
  constructor(private http:HttpClient,private toastrService:ToastrService,private router:Router) {
    this.clientObservable=this.clientSubject.asObservable();
   }


  Login(userLogin:IuserLogin):Observable<Client>{

   return this.http.post<Client>(CLIENT_LOGIN_URL,userLogin).pipe(
    tap({
      next:(user)=>{
        this.setclienttolocalstorage(user)
           this.clientSubject.next(user);
           this.toastrService.success(
            `Welcome to near | ${user.email}`,
            'Login Successful'
           )
      },
      error:(errorResponse)=>{
        this.toastrService.error(
          errorResponse.error,'Login failed'
         )
      }
    })
   )

   }

   private setclienttolocalstorage(freelancer:Client){
    localStorage.setItem(CLIENT_KEY,JSON.stringify(freelancer))

   }

   private getclientFromLocalStorage():Client{
       const freelancerJson=localStorage.getItem(CLIENT_KEY);
       if(freelancerJson) return JSON.parse(freelancerJson) as Client;
       return new Client();

   }

   logout(){
    this.clientSubject.next(new Client());
    localStorage.removeItem(CLIENT_KEY);
    //to refresh the page
    this.router.navigateByUrl('/')
  }
  completeProfile(client:Iclient){
    console.log(client)
   return this.http.post(CLIENT_COMPLETE_URL,client).pipe(
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

   ClientProject(idClient:string):Observable<Client[]>{
    console.log(idClient)
    return this.http.get<Client[]>(CLIENT_PROJECT_URL + idClient)
  }

  sendMessage(body:string,id_client:string,id_freelancer:string){
    return this.http.post(SENDMESSAGE_CLIENT_URL,{
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

  getMessagesenders(idClient:string){
    return this.http.get(RCIEVEMESSAGE_CLIENT_URL+idClient)
  }

  register(clientRegister:IuserRegister){
    console.log('hello');
    return this.http.post(CLIENT_REGISTER_URL,clientRegister).pipe(
      tap({
        next:(User:any)=>{
      this.setclienttolocalstorage(User);
        },
        error:(errorResponce)=>{
          this.toastrService.error(errorResponce.error,'Sign up echoiee')
        }
      })
    )

}
}


