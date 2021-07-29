import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Categoria } from 'src/app/models/Categorias';
import { RestCategoriaService } from 'src/app/services/restCategoria/rest-categoria.service';

@Component({
  selector: 'app-cat-add',
  templateUrl: './cat-add.component.html',
  styleUrls: ['./cat-add.component.css']
})
export class CatAddComponent implements OnInit {
  
  categoria: Categoria;
  public fileCategory:Array<File>;
  private readonly notifier;
  private token;
  constructor(private restCategoria: RestCategoriaService, private notifierService: NotifierService){
    this.categoria = new Categoria('','','','');
    this.notifier = notifierService;
    this.token = restCategoria.getToken();
  }

  ngOnInit(): void {
  }

  addCategoria(form){
    this.restCategoria.addCategoria(this.categoria).subscribe((res:any)=>{
      if(res.categoriaSaved){
        this.notifier.notify("success", res.message);
        this.updateCategoria(res.categoriaSaved._id, this.fileCategory);
        form.reset();
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", error.error.message));
  }

  updateCategoria(idCategory, files){
    this.restCategoria.setImage(idCategory,[],files,this.token, 'image')
    .then((res:any)=>{
      if(res.categoria){
        this.notifier.notify("success", res.message);
      }else{
        this.notifier.notify("error",res.message);
      }
    }).catch((err) => {

    });
  }

  fileChange(fileInput){
    this.fileCategory = <Array<File>>fileInput.target.files;
  }

}
