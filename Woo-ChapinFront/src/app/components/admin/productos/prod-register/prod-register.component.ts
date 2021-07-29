import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Productos } from 'src/app/models/Productos';
import { CONNECTION } from 'src/app/services/global';
import { RestProductoService } from 'src/app/services/restProducto/rest-producto.service';
import { RestCategoriaService } from 'src/app/services/restCategoria/rest-categoria.service';

@Component({
  selector: 'app-prod-register',
  templateUrl: './prod-register.component.html',
  styleUrls: ['./prod-register.component.css']
})
export class ProdRegisterComponent implements OnInit {
  products:[];
  public uri;
  private readonly notifier;
  public producto:Productos;
  categories:[];
  public value;

  constructor(private restCategory:RestCategoriaService, private restProducto:RestProductoService, private notifierService:NotifierService) {
      this.notifier = notifierService;
      this.producto = new Productos('','','',null,null,null,null,'',null);
      this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
  }

  getCategory(){
    this.restCategory.getCategoryAdmin().subscribe((res:any)=>{
      if(res.categories){
        this.categories = res.categories;
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", "ocurrió un error en la consulta"));
  }

  getProducts(){
    this.restProducto.getProducts().subscribe((res:any)=>{
      if(res){
        this.products = res.productosFind;
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error=>this.notifier.notify("error", "ocurrió un error en la consulta"));
  }

  updateProduct(){
    this.restProducto.updateProducts(this.producto, this.producto._id).subscribe((res:any)=>{
      if(res.updated){
        this.getProducts();
        this.notifier.notify("success", res.message);
      }else{
        this.getProducts();
        this.notifier.notify("error", res.message)
      }
    }, error=>this.notifier.notify("error", "ocurrió un error en la consulta "+error.error.message));
  }
  
  removeProduct(){
    this.restProducto.removeProduct(this.producto._id).subscribe((res:any)=>{
      if(res.productDeleted){
        this.notifier.notify("success", res.message);
        this.getProducts();
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error=>this.notifier.notify("error", "ocurrió un error en la consulta "+error.error.message));
  }

  onKey(value){
    
    this.producto.tags.push(this.value)
    this.value="";
  }

  selectProduct(product){
    this.producto = product;
  }

  deleteTag(tag){
    if (tag > -1) {
      this.producto.tags.splice(tag, 1);
   }
    console.log(this.producto);
  }
}
