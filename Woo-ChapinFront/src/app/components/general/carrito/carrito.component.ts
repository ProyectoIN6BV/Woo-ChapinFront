import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Carrito } from 'src/app/models/Carrito';
import { Envio } from 'src/app/models/Envio';
import { Municipio } from 'src/app/models/Municipios';
import { User } from 'src/app/models/User';
import { CONNECTION } from 'src/app/services/global';
import { RestCartService } from 'src/app/services/restCart/rest-cart.service';
import { RestEnvioService } from 'src/app/services/restEnvio/rest-envio.service';
import { RestFacturaService } from 'src/app/services/restFactura/rest-factura.service';
import { RestMunicipioService } from 'src/app/services/restMunicipio/rest-municipio.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public user:User;
  private readonly notifier;
  carrito:Carrito;
  public uri;
  public NIT;
  public envio:Envio;
  public municipioSelected:Municipio;
  public municipios: Municipio[];
  public isChecked;
  public valor;
  public direcciones:[];

  constructor(private restCart:RestCartService, private notifierService:NotifierService, private restFactura:RestFacturaService, 
    private restEnvio:RestEnvioService, private restMunicipio:RestMunicipioService, private restUser:RestUserService) { 
    this.user = restCart.getUser();
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
    this.envio = new Envio('','','','','','',[],[]);
    this.municipioSelected = new Municipio('','',null);
  }

  ngOnInit(): void {
    this.getCarrito();
    this.getMunicipio();
    this.getDirecciones();
  }

  setData(){
    if(this.isChecked){
      this.envio.nameReceiver = this.user.name;
      this.envio.lastNameReceiver = this.user.lastName;
      this.envio.phone = this.user.phone;
      this.envio.address = this.user.email;
    }else{
      this.envio.nameReceiver = "";
      this.envio.lastNameReceiver = "";
      this.envio.phone = "";
      this.envio.address = "";
    }
  }

  selectEnvio(valor){
    console.log(valor)

    for(let elem in this.municipios){
      if(this.municipios[elem]._id == valor){
        this.valor = this.municipios[elem].precioEnvio;
        this.municipioSelected = this.municipios[elem];
      }
    }

  }

  selectDireccion(valor){
    this.envio.specificAddress = valor;
  }

  getDirecciones(){
    if(this.user != null){
      this.restUser.getDirecciones(this.user._id).subscribe((res:any)=>{
        if(res.addresFind){
          this.direcciones = res.addresFind.direcciones;
        }else{
          this.notifier.notify("error",res.message);
        }
      } ,error=> this.notifier.notify("error", error.error.message))
    }
  }

  getMunicipio(){
    if(this.user != null){
      this.restMunicipio.getMunicipios().subscribe((res:any)=>{
        if(res.municipios){
          this.municipios = res.municipios;
        }else{
          this.notifier.notify("error",res.message);
        }
      },error=> this.notifier.notify("error", error.error.message))
    }
  }

  getCarrito(){
    if(this.user != null){
      this.restCart.getCarrito(this.user._id).subscribe((res:any)=>{
        if(res.carritoFind){
          this.carrito = res.carritoFind;
        }else{
          this.notifier.notify("error",res.message);
          this.carrito = new Carrito('',[],null,'');
        }
      }, error=> this.notifier.notify("error", error.error.message))
    }else{
      this.notifier.notify("info", "Ingresa sesión para ver el carrito");
    }
  }

  addCart(productId){
    console.log(this.user);
    if(this.user != null){
      this.restCart.addProductCart(this.user._id,productId,1).subscribe((res:any)=>{
        console.log(res);
        if(res.carritoFind2 || res.carritoUpdated || res.carritoUp){
          this.notifier.notify("success", res.message);
          this.getCarrito();
        }else{
          this.notifier.notify("error", res.message);
        }
      }, error=> this.notifier.notify("error", "Error general: "+ error.error.message));
    }else{
      this.notifier.notify("info", "Para adquirir un producto debes de ingresar sesión");
    }
  }

  DeleteValor(productId){
    console.log(this.user);
    if(this.user != null){
      this.restCart.deleteValor(this.user._id,productId).subscribe((res:any)=>{
        console.log(res);
        if(res.carritoDeleted || res.carritoFind3){
          this.notifier.notify("success", res.message);
          this.getCarrito();
        }else{
          this.notifier.notify("error", res.message);
        }
      }, error=> this.notifier.notify("error", "Error general: "+ error.error.message));
    }else{
      this.notifier.notify("info", "Para adquirir un producto debes de ingresar sesión");
    }
  }

  crearFactura(form){
    console.log(this.NIT);
    this.restFactura.crearFactura(this.user._id, this.NIT).subscribe((res:any)=>{
      if(res.facturaFind  ){
        this.crearEnvio(res.facturaFind._id, form);
        console.log(res.message);

      }else{
        this.getCarrito();
        this.notifier.notify("error", res.message);
      }
    }, error=> {this.notifier.notify("error", "Error general: "+ error.error.message),    this.getCarrito();  });
  }

  crearEnvio(facId,form){
    this.restEnvio.createEnvio(this.envio,this.municipioSelected._id,this.user._id,facId).subscribe((res:any)=>{
      
      if(res.envioSaved){
        form.reset();
        this.notifier.notify("success", res.message);
        this.getCarrito();
      }else{
        this.notifier.notify("error", res.message);
      }
    },error=> this.notifier.notify("error", "Error general: "+ error.error.message));
  }



}
