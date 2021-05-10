import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
baseurl="https://localhost:5001/api/";
validationError:string[]=[];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

get404error()
{this.http.get(this.baseurl+'error/not-found').subscribe(response=>{console.log(response);},error=>{console.log(error);
});

}

get400validationerror()
{this.http.post(this.baseurl+'account/register',{}).subscribe(response=>{console.log(response);},error=>{console.log(error);
});

}
get400error()
{this.http.get(this.baseurl+'error/bad-request').subscribe(response=>{console.log(response);},error=>console.log(error));

}

get401error()
{this.http.get(this.baseurl+'error/auth').subscribe(response=>{console.log(response);},error=>console.log(error));

}

get500error()
{this.http.get(this.baseurl+'error/server-error').subscribe(response=>{console.log(response);},error=>console.log(error));

}
}
