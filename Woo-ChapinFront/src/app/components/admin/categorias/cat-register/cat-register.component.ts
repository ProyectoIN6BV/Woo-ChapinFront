import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Categoria } from 'src/app/models/Categorias';
import { CONNECTION } from 'src/app/services/global';
import { RestCategoriaService } from 'src/app/services/restCategoria/rest-categoria.service';

@Component({
  selector: 'app-cat-register',
  templateUrl: './cat-register.component.html',
  styleUrls: ['./cat-register.component.css']
})
export class CatRegisterComponent implements OnInit {

  categories:[];
  private readonly notifier;
  public uri;
  categoria:Categoria;
  constructor(private notifierService:NotifierService, private restCategoria: RestCategoriaService) { 
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
    this.categoria = new Categoria('','','','');
  }

  ngOnInit(): void {
    this.getCategory();
  }


  getCategory(){
    this.restCategoria.getCategoryAdmin().subscribe((res:any)=>{
      if(res.categories){
        this.categories = res.categories;
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", "ocurrió un error en la consulta"));
  }

  updateCategory(){
    this.restCategoria.updateCategory(this.categoria, this.categoria._id).subscribe((res:any)=>{
      if(res.updated){
        this.notifier.notify("success", res.message);
        this.getCategory();
      }else{
        this.notifier.notify("error", res.message);
        this.getCategory();
      }
    }, error=> this.notifier.notify("error", "ocurrió un error en la consulta") );
  }

  removeCategory(){
    this.restCategoria.removeCategory(this.categoria._id).subscribe((res:any)=>{
      console.log(res);
      if(res.categoryDeleted){
        this.notifier.notify("success", res.message);
        this.getCategory();
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", "ocurrió un error en la consulta"))
  }

  selectCategory(category){
    this.categoria = category;
  }

  reset(){
    this.getCategory();
  }
}
