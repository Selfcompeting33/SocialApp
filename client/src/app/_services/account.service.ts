import { environment } from './../../environments/environment.prod';
import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
   baseurl=environment.apiURL;
   private currentUserSource=new ReplaySubject<User>(1);
   currentUser$=this.currentUserSource.asObservable();

  constructor(private http :HttpClient) { }

  login(model:any)
  {  
return this.http.post(this.baseurl+'account/login',model).pipe(map((response:User)=>{
  const user=response;
  if(user)
  {localStorage.setItem('user',JSON.stringify(user));
 this.currentUserSource.next(user);
 return user;
}
}));


  }
  
  Register(model:any)
  {  
return this.http.post(this.baseurl+'account/register',model).pipe(map((response:User)=>{
  const user=response;
  if(user)
  {localStorage.setItem('user',JSON.stringify(user));
 this.currentUserSource.next(user);
 return user;
}
}));


  }
  setCurrentUser(user:User)
  {this.currentUserSource.next(user);}

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
