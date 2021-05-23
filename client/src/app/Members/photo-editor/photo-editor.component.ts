import { Photo } from './../../_models/Photo';
import { MemberService } from './../../_services/member.service';
import { AccountService } from './../../_services/account.service';
import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member:Member;
  uploader:FileUploader;
  hasBaseDropzoneOver=false;
baseUrl=environment.apiURL;
user:User;
  photoId:number;

  constructor(private accountService:AccountService,private memberService:MemberService) { 

    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);
  }

  ngOnInit(): void {this.initializeUploader();
  }
fileOverBase(e:any)
{
this.hasBaseDropzoneOver=e;

}

  initializeUploader()
  {this.uploader=new FileUploader(
    {
      url:this.baseUrl+'user/addPhotos',
      authToken:'Bearer '+ this.user.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024

    });

  this.uploader.onAfterAddingFile=(file)=>{
    file.withCredentials=false;}

this.uploader.onSuccessItem=(item,response,status,headers)=>{
  if(response)
  {
    const photo =JSON.parse(response);
    this.member.photos.push(photo);
}

  }

  }
  photoMain(photo:Photo)
  {
this.memberService.setMainPhoto(photo.id).subscribe(()=>{
  this.user.photoUrl=photo.url;
  //   this.accountService.currentUser$.subscribe(users=>users.photoUrl=photo.url);
 this.accountService.setCurrentUser(this.user);
  this.member.phototUrl=photo.url;
  this.member.photos.forEach(p=>{
    if(p.isMain)
    p.isMain=false;
    if(p.id===photo.id)
    p.isMain=true;
  });
});

  }
  deletePhoto(photo:Photo)
  {

this.memberService.deletePhoto(photo.id)
  .subscribe(() =>{  if(photo.isMain)
    {this.member.phototUrl=null;
// this.accountService.currentUser$.subscribe(users=>users.photoUrl=null);
     this.user.photoUrl=null;
    this.accountService.setCurrentUser(this.user);
    }
    this.member.photos=this.member.photos.filter(x=>x.id!==photo.id);
  
    
    
    });
  };



  }

