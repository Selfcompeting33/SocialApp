import { Member } from './../../_models/member';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MemberService } from './../../_services/member.service';
import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {
  member:Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService:MemberService,private route:ActivatedRoute) { }

  ngOnInit(): void { 
    this.loadMember();
    this.galleryOptions=[
{
       width:'500px',
        height: '400px',
        imagePercent:100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
}


    ];
   


  }
  getImages():NgxGalleryImage[]
  { const imageUrls=[];
    for(const photo of this.member.photos)
    {imageUrls.push({small:photo?.url,
      medium:photo?.url,
      big:photo?.url});
    }
    return imageUrls;
  }

  loadMember()
    {this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member=>{this.member=member;
         this.galleryImages=this.getImages();});


}
}
