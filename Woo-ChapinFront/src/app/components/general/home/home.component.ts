import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
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
  constructor(private notifierService:NotifierService, private restProduct:RestProductoService) { 
    this.getBestSellers();
    this.getNewProcuct();
    this.uri = CONNECTION.URI;
    this.notifier = this.notifierService;
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
}
