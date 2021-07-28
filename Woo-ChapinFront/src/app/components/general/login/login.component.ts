import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  private readonly notifier;
  token:string;
  public password2;

  constructor( private notifierService:NotifierService, private restUser:RestUserService) { 
    this.user = new User('','','','','','','',[]);
    this.notifier = notifierService;
  }

  ngOnInit(): void {

  }

  onclick(login){
    this.restUser.login(this.user,'true').subscribe((res:any)=>{
      if(!res.token){
        this.notifier.notify("error", "No se generó token en la petición");
      }else{
        this.notifier.notify("success", "Logueado Correctamente");
          setTimeout(()=>{
         // delete res.user.password;
            this.token = res.token;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.user = res.user;         
            login.reset();
          },1000)        
      }
    },error=>{
      this.notifier.notify("error", error.error.message);
    })
  }
}
