import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  public uri;
  images: any[];
  public image1;
  public image2;
  public image3;
  constructor(private restUser:RestUserService) {
    this.uri = CONNECTION.URI;
    this.images = null;
  }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(){
    this.restUser.getImages().subscribe((res:any)=>{
      if(res.carouselFind){
        this.images = res.carouselFind.images;
        this.image1 = this.images[0].image;
        this.image2 = this.images[1].image;
        this.image3 = this.images[2].image;
      }else{
        this.images = null;
      }
    })
  }
}
