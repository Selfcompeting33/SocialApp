import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  model:any={};
 
  constructor(public accountservice:AccountService) { }

  ngOnInit(): void {
  }
login()
{
  
this.accountservice.login(this.model).subscribe(Response=>{console.log(Response);},error=>{console.log(error);});


}
logout()
{this.accountservice.logout();
 }
 
}