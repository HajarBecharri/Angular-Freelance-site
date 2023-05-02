import { Injectable } from '@angular/core';
import{BehaviorSubject,Observable, tap} from 'rxjs'
import { Client } from '../shared/models/Client';
import { IuserLogin } from '../shared/models/interfaces/IuserLogin';
import {HttpClient} from '@angular/common/http'
import { CLIENT_LOGIN_URL } from '../shared/models/constantes/urs';
import { ToastrService } from 'ngx-toastr';

const CLIENT_KEY='client'
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientSubject= new BehaviorSubject<Client>(this.getclientFromLocalStorage());
  public clientObservable:Observable<Client> ;
  constructor(private http:HttpClient,private toastrService:ToastrService) {
    this.clientObservable=this.clientSubject.asObservable();
   }


  Login(userLogin:IuserLogin):Observable<Client>{
     
   return this.http.post<Client>(CLIENT_LOGIN_URL,userLogin).pipe(
    tap({
      next:(user)=>{
        this.setclienttolocalstorage(user)
           this.clientSubject.next(user);
           this.toastrService.success(
            `Welcome to near ${user.name}`,
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
    window.location.reload();
  }
}


