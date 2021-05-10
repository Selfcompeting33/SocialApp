import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
   error:any;
  constructor(private routr:Router) {
    //state can be accessed only inside constructor
    const navigation=this.routr.getCurrentNavigation(); 
    this.error=navigation?.extras?.state?.error;
    
  }

  ngOnInit(): void {
  }

}
