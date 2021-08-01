import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestProductoService } from 'src/app/services/restProducto/rest-producto.service';
import { User } from 'src/app/models/User';
import { RestCartService } from 'src/app/services/restCart/rest-cart.service';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {
  public id;
  products: [];
  public uri;
  public user:User;
  private readonly notifier;
  constructor(private route: ActivatedRoute, private restProduct:RestProductoService, private notifierService:NotifierService,private restCart:RestCartService) { 
    this.id = route.snapshot.params.id;
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
    this.user = restCart.getUser();
    this.getProductsCategory();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProductsCategory();
  }

  getProductsCategory(){
    this.restProduct.getProductCategory(this.id).subscribe((res:any)=>{
      if(res.productosFind){
          this.products = res.productosFind;
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error => this.notifier.notify("error", error.error.message))
  }

  evento(){
    this.id = this.route.snapshot.params.id;
    this.getProductsCategory();
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
