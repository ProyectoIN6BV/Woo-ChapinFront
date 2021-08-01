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
  private readonly notifier;
  constructor(private restUser: RestUserService, notifierService:NotifierService) { 
    this.notifier =notifierService;
    this.images = null;
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.getImages();
  }

  
  getImages(){
    this.restUser.getImages().subscribe((res:any)=>{
      if(res.carouselFind){
        this.images = res.carouselFind.images;
      }else{
        this.images = null;
      }
    })
  }
}
