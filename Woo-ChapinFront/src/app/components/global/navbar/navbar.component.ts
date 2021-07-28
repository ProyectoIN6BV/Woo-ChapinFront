import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  show = true;
  showFixed = false;
  public token;
  public role;
  public user:User;
  constructor(public loader: LoaderService,private restUser:RestUserService) { 
    this.token = restUser.getToken();
    this.user = restUser.getUser();
    this.getRole();
  }
  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
    this.getRole();
  }
  changeClass(){

    let scrollPosition = window.pageYOffset;
    if(scrollPosition != 0){
      if(this.showFixed == false ){
        this.showFixed = true;
        this.show = false;
      }
    }else{
      if(this.show == false ){
        this.show = true;
        this.showFixed = false;
      }
    }

    
  }
  getRole(){
    if(this.user ==null){
      this.role = null;
    }else{
      this.role = this.user.role;
    }
  }

  logOut(){
    localStorage.clear();
    this.token = this.restUser.getToken();
  }
  ngOnInit(): void {
    this.getRole();
  }

}
