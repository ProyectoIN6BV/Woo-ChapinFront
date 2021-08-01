import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestFacturaService } from 'src/app/services/restFactura/rest-factura.service';

import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  public uri;
  public readonly notifier;
  public numberUser;
  public numberFac;
  public tVendido;
  public user:User;

  constructor(private restUserService: RestUserService, private restNotifier:NotifierService,private restFacturaService: RestFacturaService) {
    this.notifier = restNotifier;
   }

  ngOnInit(): void {
    this.countUser();
    this.countPedido();
    this.totalVendido();
    
  }

  countUser(){
    this.restUserService.countUser().subscribe((res:any)=>{
      if(res.userCount){
        this.numberUser = res.userCount;
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }

  countPedido(){
    this.restFacturaService.countPedido().subscribe((res:any)=>{
      if(res.pedidoCount){
        this.numberFac = res.pedidoCount;        
      }else{
        this.numberFac = res.pedidoCount;
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }

  totalVendido(){
    
    this.restFacturaService.totalVendido().subscribe((res:any)=>{
      if(res.sum){
        this.tVendido = res.sum;   
        console.log(this.tVendido)     
      }else{
        this.tVendido = "0.00"
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
}
