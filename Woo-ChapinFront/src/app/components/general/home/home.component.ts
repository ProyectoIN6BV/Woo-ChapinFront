import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { CONNECTION } from 'src/app/services/global';
import { RestCartService } from 'src/app/services/restCart/rest-cart.service';
import { RestProductoService } from 'src/app/services/restProducto/rest-producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  bestProducts:any[];
  newProducts:[];
  public uri;
  public user:User;
  private readonly notifier;
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3, "autoplay": true,responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ]};
  constructor(private notifierService:NotifierService, private restProduct:RestProductoService, private restCart:RestCartService) { 
    this.getBestSellers();
    this.getNewProcuct();
    this.uri = CONNECTION.URI;
    this.notifier = this.notifierService;
    this.user = restCart.getUser();
  }

  ngOnInit(): void {
    this.getNewProcuct();
    this.getBestSellers();
  }
  getBestSellers(){
    this.restProduct.bestSellers().subscribe((res:any)=>{
      if(res.productosFind){
        this.bestProducts = res.productosFind
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", "Error general: "+ error.error.message));
  }

  getNewProcuct(){
    this.restProduct.newProduct().subscribe((res:any)=>{
      if(res.productosFind){
        this.newProducts = res.productosFind;
        console.log(this.newProducts);
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", "Error general: "+ error.error.message));
  }


  addCart(productId){
    console.log(this.user);
    if(this.user != null){
      this.restCart.addProductCart(this.user._id,productId,1).subscribe((res:any)=>{
        console.log(res);
        if(res.carritoFind2 || res.carritoUpdated || res.carritoUp){
          this.notifier.notify("success", res.message);
          if(res.carritoFind2){
            localStorage.setItem("carrito", JSON.stringify(res.carritoFind2))
          }else if(res.carritoUpdated){
            localStorage.setItem("carrito", JSON.stringify(res.carritoUpdated))
          }else{
            localStorage.setItem("carrito", JSON.stringify(res.carritoUp))
          }
        }else{
          this.notifier.notify("error", res.message);
        }
      }, error=> this.notifier.notify("error", "Error general: "+ error.error.message));
    }else{
      this.notifier.notify("info", "Para adquirir un producto debes de ingresar sesión");
    }
  }
}
