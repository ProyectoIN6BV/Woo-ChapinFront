import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Productos } from 'src/app/models/Productos';
import { CONNECTION } from 'src/app/services/global';
import { RestProductoService } from 'src/app/services/restProducto/rest-producto.service';

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
  constructor(private route:ActivatedRoute, private restProduct:RestProductoService, private notifierService:NotifierService){
    this.uri = CONNECTION.URI; 
    
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
}
