import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
 
  registerContent=false;
 

  constructor() { }

  ngOnInit(): void {
  }
  RegisterToggle()
  {
this.registerContent=!this.registerContent;

  }

 
cancelRegisterMode(event:boolean)
{
  this.registerContent=event;
}
}
