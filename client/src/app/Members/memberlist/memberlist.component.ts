import { Observable } from 'rxjs';
import { Member } from './../../_models/member';
import { MemberService } from '../../_services/member.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
 
  members$:Observable<Member[]>;
  constructor(private memberService:MemberService) { }

  ngOnInit(): void {//this.loadMembers();
   this.members$= this.memberService.getMembers();

  }
// loadMembers()
// {this.memberService.getMembers().subscribe(members=>{this.members=members;});



// }
}
