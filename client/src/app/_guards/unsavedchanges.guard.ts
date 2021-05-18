import { MemberEditComponent } from './../Members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsavedchangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: MemberEditComponent):boolean {
      if(component.editFormname.dirty)
      {
        return confirm('Any unchanged changes will be lost!!');
 
  }
   return true;
}
}
