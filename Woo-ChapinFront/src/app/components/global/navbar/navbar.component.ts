import { Component, DoCheck, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public total;
  public color;
  public user:User;
  constructor(public loader: LoaderService,private restUser:RestUserService, private el:ElementRef, private router:Router) { 
    this.token = restUser.getToken();
    this.user = restUser.getUser();
    this.getRole();
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
    this.getRole();
    this.getTotal();
    this.getLocalColor();
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

  getTotal(){
    if(localStorage.getItem("carrito") == undefined || localStorage.getItem("carrito") == null){ 
      this.total = "00.00";
    }else{
      let carrito = JSON.parse(localStorage.getItem("carrito"));
      this.total = carrito.total;
      
    }
    
  }

  logOut(){
    
    
    localStorage.clear();
    this.router.navigateByUrl("")
    localStorage.setItem("color", JSON.stringify(this.color))
    this.token = this.restUser.getToken();
    
  }

  getColors(){
    this.restUser.getColors().subscribe((res:any)=>{
      if(res.coloresFind){
        this.color = res.coloresFind;
        (this.el.nativeElement as HTMLElement).style.setProperty('--primary1', this.color.primario);
        (this.el.nativeElement as HTMLElement).style.setProperty('--second', this.color.secundario);
        localStorage.setItem("color", JSON.stringify(this.color))
      }else{
        console.log(res.message)
      }
    }, error => console.log(error));
  }

  getLocalColor(){
    this.color = JSON.parse(localStorage.getItem("color"));
    (this.el.nativeElement as HTMLElement).style.setProperty('--primary1', this.color.primario);
    (this.el.nativeElement as HTMLElement).style.setProperty('--second', this.color.secundario);
  }

  ngOnInit(): void {
    this.getRole();
    this.getColors();
  }

}
