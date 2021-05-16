import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  

  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {  

    let currentUser: User ;
    this.accountService.currentUser$.pipe(take(1)).subscribe(currentuser=>currentUser=currentuser);
    if(currentUser)
    {

      request=request.clone({
      setHeaders:{
          Authorization:`bearer ${currentUser.token}`
        }
      })
    }

    return next.handle(request);
  }
}
