import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {
  public user:User;
  public password2;
  private readonly notifier;

  constructor( private notifierService:NotifierService, private restUser:RestUserService) { 
    this.user = restUser.getUser();
    this.notifier = notifierService;
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    
  }

    
  editarCuenta(){    
    delete this.user.password;
    delete this.user.role;
    this.restUser.editarCuenta(this.user, this.user._id).subscribe((res:any)=>{
      if(res.userUpdated){
        this.notifier.notify("success", res.message);
        localStorage.setItem("user", JSON.stringify(res.userUpdated))
        this.user = res.userUpdated;
      }else{
        this.notifier.notify("error", res.message);
        this.user;
      }
    }, error=> this.notifier.notify("error", "ocurrió un error en la consulta") );
  }
}
