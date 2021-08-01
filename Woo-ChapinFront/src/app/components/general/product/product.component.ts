import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Productos } from 'src/app/models/Productos';
import { CONNECTION } from 'src/app/services/global';
import { RestProductoService } from 'src/app/services/restProducto/rest-producto.service';
import { User } from 'src/app/models/User';
import { RestCartService } from 'src/app/services/restCart/rest-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public product: Productos;
  public uri;
  public id;
  private  notifier;
  public user:User;
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

  public similarProducts:[];
  constructor(private route:ActivatedRoute, private restProduct:RestProductoService, private notifierService:NotifierService,private restCart:RestCartService){
    this.uri = CONNECTION.URI; 
    this.user = restCart.getUser();
    this.id = route.snapshot.params.id;
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getProduct();
    this.getProductTag();
  }

  getProduct(){
    this.restProduct.getProductId(this.id).subscribe((res:any)=>{
      if(res.productFind){
        this.product = res.productFind;
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error => this.notifier.notify("error", error.error.message));
  }

  getProductTag(){
    this.restProduct.getProductTags(this.id).subscribe((res:any)=>{
      if(res.productFind1){
        this.similarProducts = res.productFind1;
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error => this.notifier.notify("error", error.error.message));
  }

  getProductS(id){
    this.restProduct.getProductId(id).subscribe((res:any)=>{
      if(res.productFind){
        this.product = res.productFind;
        this.getProductTag();
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error => this.notifier.notify("error", error.error.message));
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
