import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Member } from '../_models/member';
// const httpOptions={headers:new HttpHeaders(
//   {Authorization:'Bearer'+JSON.parse(localStorage.getItem("user"))?.token

// })}
@Injectable({
  providedIn: 'root'
})
export class MemberService { 
   baseUrl=environment.apiURL;
 
  constructor(public  http:HttpClient) { }
  getMembers()
  {   

    


    return this.http.get<Member[]>(this.baseUrl+'user/GetUsers');


}
 getMember(username:string)
  {   

    


    return this.http.get<Member>(this.baseUrl+'user/GetUser/'+username);


}
 
  }

