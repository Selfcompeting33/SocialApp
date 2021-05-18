import { ToastrService } from 'ngx-toastr';
import { MemberService } from './../../_services/member.service';
import { Member } from 'src/app/_models/member';
import { User } from './../../_models/user';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})

export class MemberEditComponent implements OnInit {
  user:User;
  member:Member;
  @ViewChild('editForm') editFormname:NgForm;
  @HostListener('window:beforeunload',['$event'])unloadNotification($event:any){
    if(this.editFormname.dirty)
    $event.returnValue=true;
  }

  constructor(private accountService:AccountService,private memberService:MemberService,private toastr:ToastrService) { }

  ngOnInit(): void {this.getUser();
  }
  getUser()
  {
this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{this.user=user;
this.loadMember()});
}
loadMember()
{
  
  this.memberService.getMember(this.user.username).subscribe(member=>this.member=member);

}
memberUpdate()
{ this.memberService.updateMember(this.member).subscribe(()=> {this.toastr.success("updated successfully");
   this.editFormname.reset(this.member);});

}
}