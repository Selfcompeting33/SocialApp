import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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
   members:Member[]=[];
 
  constructor(public  http:HttpClient) { }
  getMembers()
  {   
if(this.members.length>0)
return of(this.members);
    

    return this.http.get<Member[]>(this.baseUrl+'user/GetUsers').pipe(map(members=>{this.members=members;
   return members;
}));


}
 getMember(username:string)
  {   

    

const member=this.members.find(x=>x.userName===username);
if(member!==undefined)
return of(member);

  return this.http.get<Member>(this.baseUrl+'user/GetUser/'+username);
  

}
updateMember(member:Member)
{ 
var index=this.members.indexOf(member) 
return this.http.put<Member>(this.baseUrl+'user/UpdateUser',member).pipe(map(()=>{
  this.members[index]=member;
}));
}
setMainPhoto(photoId:number)
{
return this.http.put(this.baseUrl+'user/setMainPhoto/'+photoId,{});

}
deletePhoto(id:number)
{

  return this.http.delete(this.baseUrl+'user/deletePhoto/'+id);
}


 }

