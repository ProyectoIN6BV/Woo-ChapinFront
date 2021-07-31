import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-mis-direcciones',
  templateUrl: './mis-direcciones.component.html',
  styleUrls: ['./mis-direcciones.component.css']
})
export class MisDireccionesComponent implements OnInit {
  public user:User;
  public password2;
  private readonly notifier;
  public direccion;
  public direccioness;

  constructor( private notifierService:NotifierService, private restUser:RestUserService) { 
    this.user = restUser.getUser();
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getDirecciones();
  }


  agregarDireccion(){  
    this.restUser.agregarDireccion(this.direccion, this.user._id).subscribe((res:any)=>{
      if(res.pushAddress){
        this.notifier.notify("success", res.message);
        localStorage.setItem("user", JSON.stringify(res.pushAddress))
        this.user = res.pushAddress;
        this.getDirecciones();
      }else{
        this.notifier.notify("error", res.message);
        this.user;
      }
    }, error=> this.notifier.notify("error", "ocurrió un error en la consulta") );
  }

  getDirecciones(){
    this.restUser.getDirecciones(this.user._id).subscribe((res:any)=>{
      if(res.addresFind){
        this.direccioness = res.addresFind;
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }

  removeAddress(){ 
    this.restUser.removeAddress(this.direccioness.direccion, this.user._id).subscribe((res:any)=>{
      if(res.pushAddress){
        this.notifier.notify("success", res.message);
        this.getDirecciones();
      }else{
        this.notifier.notify("error", res.message);
        this.user;
      }
   }, error=> this.notifier.notify("error", "ocurrió un error en la consulta")
   );
  }

  selectDireccion(direccion){
    console.log("Select");
    this.direccioness = direccion;
    console.log(this.direccioness);        
  }
}
