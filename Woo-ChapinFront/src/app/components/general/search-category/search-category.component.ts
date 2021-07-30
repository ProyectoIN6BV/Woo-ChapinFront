import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestProductoService } from 'src/app/services/restProducto/rest-producto.service';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {
  public id;
  products: [];
  public uri;
  private readonly notifier;
  constructor(private route: ActivatedRoute, private restProduct:RestProductoService, private notifierService:NotifierService) { 
    this.id = route.snapshot.params.id;
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
    console.log(this.id);
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
}
