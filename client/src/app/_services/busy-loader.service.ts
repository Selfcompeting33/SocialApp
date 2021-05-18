import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyLoaderService {
  busyreqcount=0;

  constructor(private spinner:NgxSpinnerService) { }
  busy()
  {
    this.busyreqcount++;
    this.spinner.show(undefined,{

      type:'line-scale-party',
      bdColor:'rgba(255,255,255,0)',
      color:'#333333'
    });

}
idle()
{
  this.busyreqcount--;
  if(this.busyreqcount<=0)
  this.busyreqcount=0;
  this.spinner.hide();


}
}