import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-personalizar',
  templateUrl: './personalizar.component.html',
  styleUrls: ['./personalizar.component.css']
})
export class PersonalizarComponent implements OnInit {
  public images:[];
  public uri;
  public file:Array<File>;
  public name;
  public id;
  public token;
  public color;
  private readonly notifier;
  constructor(private restUser: RestUserService, notifierService:NotifierService) { 
    this.notifier =notifierService;
    this.images = null;
    this.uri = CONNECTION.URI;
    this.token = restUser.getToken();
  }

  ngOnInit(): void {
    this.getImages();
    this.getColors();
  }

  
  getImages(){
    this.restUser.getImages().subscribe((res:any)=>{
      if(res.carouselFind){
        this.images = res.carouselFind.images;
        this.id = res.carouselFind._id;
      }else{
        this.images = null;
      }
    })
  }

  updateImg(){
    if(this.name!=null){
        this.restUser.setImage(this.id,[],this.file,this.token, 'image',this.name)
      .then((res:any)=>{
        if(res.producto){
          this.notifier.notify("success", res.message);
          this.getImages();
        }else{
          this.notifier.notify("error",res.message);
          this.getImages();
        }
      }).catch((err) => {
        console.log("error")
        this.getImages();
      });
    }else{
      this.notifier.notify("error", "seleccione una imagen")
    }
  }

  fileChange(fileInput, name){
    this.file = <Array<File>>fileInput.target.files;
    this.name = name;
    
  }

  getColors(){
    this.restUser.getColors().subscribe((res:any)=>{
      if(res.coloresFind){
        this.color = res.coloresFind;
        localStorage.setItem("color", JSON.stringify(this.color))
      }else{
        this.color = null;
      }
    })
  }

  updateColors(){
    this.restUser.updateColors(this.color,this.color._id).subscribe((res:any)=>{
      if(res.updated){
        this.color = res.updated;
        localStorage.setItem("color",JSON.stringify(this.color));
        this.notifier.notify("success",res.message)
      }else{
        this.notifier.notify("error",res.message)
      }
    })
  }
}
