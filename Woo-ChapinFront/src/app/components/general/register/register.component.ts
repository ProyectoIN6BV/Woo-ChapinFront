import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  private readonly notifier;
  public user:User;
  public password2;
  constructor( private notifierService:NotifierService, private restUser:RestUserService) { 
    this.user = new User('','','','','','','',[]);
    this.notifier = notifierService;
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.restUser.register(this.user).subscribe((res:any)=>{
      if(res.userSaved){
        this.notifier.notify("success", res.message);
        form.reset();
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error => this.notifier.notify("error",error.error.message))
  }
}
