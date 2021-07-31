import { Component, OnInit } from '@angular/core';
import { RestCategoriaService } from 'src/app/services/restCategoria/rest-categoria.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css']
})
export class SearchSidebarComponent implements OnInit {
  categories:[];
  private readonly notifier;
  constructor(private restCategory:RestCategoriaService, private notifierService:NotifierService,) { 
    this.notifier = notifierService;
  }

  ngOnInit(): void {
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
}
