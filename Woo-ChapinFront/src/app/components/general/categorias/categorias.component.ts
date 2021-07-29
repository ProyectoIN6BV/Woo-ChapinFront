import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestCategoriaService } from 'src/app/services/restCategoria/rest-categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public uri;
  public readonly notifier;
  public categorias:[];

  constructor(private restCategoriaService: RestCategoriaService, private restNotifier:NotifierService) {
    this.notifier = restNotifier;
   }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.restCategoriaService.getCategoria().subscribe((res:any)=>{
      if(res.categories){
        this.categorias = res.categories;
        console.log(this.categorias);
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
}
