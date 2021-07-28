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
  public user: User;
  private readonly notifier;
  token:string;
  public password2;

  constructor( private notifierService:NotifierService, private restUser:RestUserService, private router: Router) { 
    this.user = new User('','','','','','','',[]);
    this.notifier = notifierService;
  }

  ngOnInit(): void {

  }

  onclick(login){
    this.restUser.login(this.user,'true').subscribe((res:any)=>{
      if(!res.token){
        this.notifier.notify("error", res.message);
      }else{
        this.notifier.notify("success", "Logueado Correctamente");
          
         // delete res.user.password;
            this.token = res.token;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            if(res.user.role == 'ROLE_ADMIN'){
              this.router.navigateByUrl("homeAdmin");
            }else if(res.user.role == 'ROLE_CLIENTE'){
              this.router.navigateByUrl("");
            }
            login.reset();
          
      }
    },error=>{
      this.notifier.notify("error", error.error.message);
    })
  }
}
