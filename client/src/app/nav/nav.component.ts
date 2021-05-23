import { Router} from '@angular/router';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  model:any={};

 
  constructor(public accountservice:AccountService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
login()
{
  
this.accountservice.login(this.model).subscribe(user=>{console.log(user);

  this.router.navigateByUrl('/members');
}
,error=>{console.log(error); 
  const arr:string[]=error;
  if(arr.length>1)
this.toastr.error(error);});


}
logout()
{this.accountservice.logout();
  this.router.navigateByUrl('/');
 }
 
}