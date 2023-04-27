import { Injectable } from '@angular/core';
import { Observable,Subject} from 'rxjs';
import { Router } from '@angular/router';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private router: Router) {
  }

  setUserData(data){
    // data.ID = 40;
    data.id = data.ID;
    localStorage.setItem("breakDawnUser", JSON.stringify(data));
  }

  getUserData(){
    return JSON.parse(localStorage.getItem("breakDawnUser")) || {};
  }


  isUserLoggedin(){
    var user = this.getUserData();
    return ((user && user.token) ? true : false);
  }

  logout(){
    localStorage.setItem("breakDawnUser", null);
    this.router.navigate(['/']);
  }

  setCartData(data){
    localStorage.setItem("breakDawnCart", JSON.stringify(data));
  }

  getCartData(){
    return JSON.parse(localStorage.getItem("breakDawnCart")) || [];
  }
}
