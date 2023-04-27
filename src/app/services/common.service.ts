import { Injectable } from '@angular/core';
import { Observable,Subject} from 'rxjs';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { Constants } from '../constants/constants';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  days = {'1': 'Mon',
    '2': 'Tue',
    '3': 'Wed',
    '4': 'Thu',
    '5': 'Fri',
    '6': 'Sat'
  };

  constructor(protected sanitizer: DomSanitizer) { }

  getFrequencyString(value){
    switch (value) {
      case 1:
      case '1':
        return 'Once';
      case 2:
      case '2':
        return 'Twice';
      case 3:
      case '3':
        return 'Thrice';
      
      case 6:
      case '6':
        return '6 Days';
      default:
         return '';
    }
  }

  getDays(){
    return this.days;
  }

  splitCategoryDataFromCatDescription(desc){
    let data:any = {};
    let split = desc.split('\n');
    split.forEach((item)=>{
      if(item.split(':').length > 1){

        /*Concatenate 3rd item if type is URL */
        data[item.split(':')[0].toLowerCase()] = item.split(':')[1].trim() + ((item.split(':').length == 3) ? (':' + item.split(':')[2].trim()) : '');
      }
    });

    // let patternImg = desc.split("COLOR:")[0];
    // data['pattern'] = patternImg.replace("URL:", "").trim();
    // desc = desc.split("COLOR:")[1];
    // if (desc != undefined) {
    //   data['primaryColor'] = desc.split("DESC:")[0].trim();
    //   data['desc'] = desc.split("DESC:")[1].trim();
    // }
    return data;
  }

  getDataFromMetaDataByKey(metaData, key){
    let value = '';
    metaData.forEach((meta)=>{
      if (meta.key == key) {
        value = meta.value;
        return;
      }
    });
    return value;
  }

  /*Returning date 12 October, 2019 this formate*/
  getFormatedDateDDMMYYYY(date){
    if(date == undefined || date == null || date == '') {
      return '';
    }
    if (!isNaN(date)) {
      date = parseInt(date);
    }

    let d = new Date(date);
    return this.months[(d.getMonth())] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  getFormatedDateDDMMYYYYFromDDMMYYYY(date){
    if(date.split('/').length != 3){
      return this.getFormatedDateDDMMYYYY(date);
    }

    date = date.split('/');
    date = date[2] + '/' + date[1] + '/' + date[0];
    date = new Date(date).getTime();

    return  this.getFormatedDateDDMMYYYY(date);
  }

  getFormatedDateDDMMYYYYFromDate(date){
    date = new Date(date).getTime();
    let d = new Date(date);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' +  d.getFullYear();
  }

  /*Return the line items*/
  calcLineItems(subscription, fromDate ,orderCount){
    let days = subscription.days;
    days.sort(function(a, b){return a - b});
    let orderDate = this.getStartOrderDay(days, fromDate);
    let lineItems = [];

    /*Calculate line items for orderCount*/
    let finalDate = new Date(orderDate.getTime());

    while(orderCount > 0){
      days.forEach((item)=>{
        if(orderCount == 0){
          return;
        }
        orderCount = orderCount -1;

        finalDate = this.getDateToNextOrderDay(finalDate, item);
        lineItems.push(finalDate.getTime());
        finalDate.setDate(finalDate.getDate() + 1);
      });
    }

    lineItems.sort((item, item2)=>{
      return item - item2;
    });
    return lineItems;
  }

  /*Get next order date according to day*/
  getDateToNextOrderDay(date, day){
    date.setDate(date.getDate() + (day + 7 - date.getDay()) % 7);
    return date;
  }

  /*Calculate day of first delivery*/
  getStartOrderDay(days, fromDate){

    if(this.isToday(fromDate)){
      let today = fromDate;
      let tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

      /*Order check with tomorrow day. If yes check it's before 12 if yes then placed onlt tomorrow's order*/
      let tomorrowDay = tomorrow.getDay();
      let orderStartDate = dayAfterTomorrow;

      days.forEach((day)=>{
        if (days[0] == tomorrowDay) {
          if (new Date().getHours() < 12) {
            orderStartDate = tomorrow;
          }
          return;
        }
      });

      return orderStartDate;
    }
    return fromDate;
  }


  isToday(someDate){
    let today = new Date();
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  /*Returning date 12 October this formate*/
  getDeliveryDate(date){
    if(date == undefined || date == null || date == '') {
      return '';
    }
    if (!isNaN(date)) {
      date = parseInt(date);
    }

    let d = new Date(date);
    return this.months[(d.getMonth())] + ' ' + d.getDate();
  }

  isMobileDevice(){
    if(screen.width < 767) {
      return true;
    }
    return false;
  }

  paymentMethods(){
    let methods = ['Cash', 'Bank', 'Transfer', 'Cheque', 'GPay'];
    return methods;
  }


  fullBackgroundImageAnimation(sectionId, imageId, imgSectionCutOff, sectionHeight, sectionTop, callback){
    let imgCutOff = ((screen.height/100) * imgSectionCutOff);

    if(sectionHeight < 200 || ($('#' + imageId).height() < 200)){
      let imgHeight = $('#' + imageId).height();
      $( '#' + sectionId ).css( "height", (imgHeight - (imgCutOff)));
      $( '#' + sectionId ).css( "overflow", "hidden");
      $( '#' + imageId ).css( "transform", "translateY(" + -((imgCutOff/2)) + "px)" );
      $( '#' + imageId ).css( "transition", "all 0.1s" );

      // sectionTop = $('#' + sectionId).position().top;
    }

    sectionHeight = $('#' + sectionId).height();
    sectionTop = document.getElementById(sectionId).getBoundingClientRect().top + window.scrollY;

    if(window.scrollY > (sectionTop - sectionHeight)){
      let sectionStartTop = window.scrollY - sectionTop + sectionHeight;
      let translatMinus = imgCutOff * (sectionStartTop/(sectionHeight*2));
      $( '#' + imageId ).css( "transform", "translateY(" + -((imgCutOff/2 - (translatMinus))) + "px)" );
    }
    callback(sectionHeight, sectionTop);
  }

  leadingZeroToDate(date){
    date = new Date(date);
    let leadingZeroDate = ('0' + date.getDate()).slice(-2) + '/'
       + ('0' + (date.getMonth()+1)).slice(-2) + '/'
       + date.getFullYear();

    return leadingZeroDate;
  }

  scrollToDiv(id){
    $('html, body').animate({
      scrollTop: $("#" + id).offset().top - 65
    }, 1000);
  }
}
