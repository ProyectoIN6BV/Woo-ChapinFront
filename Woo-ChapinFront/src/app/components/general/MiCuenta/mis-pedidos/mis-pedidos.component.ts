import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  public user:User;
  private readonly notifier;
  public envios;  
  public envioss; 
  public facturas;   
  public uri;   


  constructor( private notifierService:NotifierService, private restUser:RestUserService) { 
    this.user = restUser.getUser();
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.getEnvios();
  }

  getEnvios(){
    this.restUser.getEnvios(this.user._id).subscribe((res:any)=>{
      if(res.userFind){
        this.envios = res.userFind;
        console.log(this.envios);
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }

  selectDireccion(envios){
    console.log("Select");
    this.envioss = envios;
    console.log(this.envioss.factura[0]._id);
    this.getFac();
  }

  getFac(){
    this.restUser.getFac(this.envioss.factura[0]._id).subscribe((res:any)=>{
      if(res.facFind){
        this.facturas = res.facFind;
        console.log(this.envioss.factura._id);
        console.log(this.facturas);
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
}
