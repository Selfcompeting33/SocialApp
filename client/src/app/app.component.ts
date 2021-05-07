import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title="Social App";

 

  constructor(private accountService:AccountService){
    
 }
 ngOnInit()
 {
  this.setCurrentUser();
}
setCurrentUser()
{ 
const user:User=JSON.parse(localStorage.getItem('user'));
this.accountService.setCurrentUser(user);

}


}
