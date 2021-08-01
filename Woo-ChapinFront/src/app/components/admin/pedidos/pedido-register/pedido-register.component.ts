import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Envio } from 'src/app/models/Envio';
import { CONNECTION } from 'src/app/services/global';
import { RestEnvioService } from 'src/app/services/restEnvio/rest-envio.service';

@Component({
  selector: 'app-pedido-register',
  templateUrl: './pedido-register.component.html',
  styleUrls: ['./pedido-register.component.css']
})
export class PedidoRegisterComponent implements OnInit {
  private readonly notifier;
  envios:[];
  public envio;
  public uri;
  constructor(private notifierService:NotifierService, private restEnvio:RestEnvioService) { 
    console.log(this.envio)
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.getEnvios();
  }

  selectEnvio(envio){
    this.envio = envio;
    console.log(envio.nameReceiver)
  }

  getEnvios(){
    this.restEnvio.getEnvioAdmin().subscribe((res:any)=>{
      if(res.envioFind){
        this.envios = res.envioFind;
        console.log(this.envios)
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error=> this.notifier.notify("error", error.error.message))
  }


}
