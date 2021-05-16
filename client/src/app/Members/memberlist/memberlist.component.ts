import { Member } from './../../_models/member';
import { MemberService } from '../../_services/member.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
 
  members:Member[];
  constructor(private memberService:MemberService) { }

  ngOnInit(): void { this.loadMembers();
  }
loadMembers()
{this.memberService.getMembers().subscribe(members=>{this.members=members;});



}
}
