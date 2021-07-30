import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Productos } from 'src/app/models/Productos';
import { RestCategoriaService } from 'src/app/services/restCategoria/rest-categoria.service';
import { RestProductoService } from 'src/app/services/restProducto/rest-producto.service';

@Component({
  selector: 'app-prod-add',
  templateUrl: './prod-add.component.html',
  styleUrls: ['./prod-add.component.css']
})
export class ProdAddComponent implements OnInit {
  producto:Productos;
  public value;
  categories:[];
  public fileProd:Array<File>;
  private readonly notifier;
  public token;
  constructor(private restCategory:RestCategoriaService, private notifierService:NotifierService, private restProducto:RestProductoService) { 
    this.producto = new Productos('','','',null,[], null, null, '',[]);
    this.notifier = notifierService;
    this.token = restProducto.getToken();
  }

  ngOnInit(): void {
    this.getCategory();
  }

  onKey(value){
    
    this.producto.tags.push(this.value)
    this.value="";
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

  saveProduct(form){
    this.restProducto.saveProduct(this.producto).subscribe((res:any)=>{
      if(res.productoSaved){
        this.notifier.notify("success", res.message);
        
        this.updateProducto(res.productoSaved._id, this.fileProd);
        this.producto = new Productos('','','',null,[],null,null,'',[]);
        form.reset();
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=>  this.notifier.notify("error", "ocurrió un error en la consulta"));
  }


  updateProducto(idProd, files){
    this.restProducto.setImage(idProd,[],files,this.token, 'image')
    .then((res:any)=>{
      if(res.producto){
        this.notifier.notify("success", res.message);
      }else{
        this.notifier.notify("error",res.message);
      }
    }).catch((err) => {

    });
  }
  fileChange(fileInput){
    this.fileProd = <Array<File>>fileInput.target.files;
  }
}
