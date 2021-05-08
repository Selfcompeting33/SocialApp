import { AccountService } from './../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Input, Output,EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  @Input() usersFromHomeComponent:any;
  @Output() cancelRegister=new EventEmitter();
  
  model:any={};

  constructor(private http:HttpClient,private accountService :AccountService,private toastr:ToastrService) { }

  ngOnInit(): void { 
  }
  register()
  {
    this.accountService.Register(this.model).subscribe(response=>{console.log(response); this.cancel();},error=>{console.log(error);
    this.toastr.error(error.error);});
    
  }
  cancel()
  {
  this.cancelRegister.emit(false);

  }


}