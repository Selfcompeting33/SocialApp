import { AuthGuard } from './_guards/auth.guard';
import { MemberlistComponent } from './Members/memberlist/memberlist.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';

import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberdetailsComponent } from './Members/memberdetails/memberdetails.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
   {path:"",
   runGuardsAndResolvers:'always',
   canActivate:[AuthGuard] ,
   children:[  {path:"members",component:MemberlistComponent},
  {path:"members/:id",component:MemberdetailsComponent},
  {path:"lists",component:ListsComponent},
  {path:"messages",component:MessagesComponent},]},
   

    {path:"**",component:HomeComponent,pathMatch:"full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
