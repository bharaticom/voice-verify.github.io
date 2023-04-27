import { Injectable } from '@angular/core';
declare var $: any;
var _this:any;

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  apiCount:any = 0;

  constructor() {
    _this = this;
  }

  apiStart(){
    if(this.apiCount == 0) {
      this.loaderSetAtleastOneSecond();

      $("body").append('<div id=\"loading-div\" class=\"d-flex justify-content-center align-items-center\">\r\n    <img height=\"50\" width=\"50\" src=\"assets\/loading.svg\" alt=\"Loading\">\r\n<\/div>');
    }
    this.apiCount++;
  }

  apiStop(){
    if(this.apiCount != 0) {
      this.apiCount--;
    }
    if(this.apiCount == 0) {
      // $('#loading-div').fadeOut('slow',function(){$('#loading-div').remove();});
      if($('#loading-div').length) {
        $( "#loading-div" ).remove();
      }
    }
  }

  loaderSetAtleastOneSecond(){
    this.apiCount++;
    setTimeout(function(){
      _this.apiStop();
    },600);
  }
}
