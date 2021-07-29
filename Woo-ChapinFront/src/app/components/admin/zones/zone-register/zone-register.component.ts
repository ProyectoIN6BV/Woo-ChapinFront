import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestMunicipioService } from 'src/app/services/restMunicipio/rest-municipio.service';

@Component({
  selector: 'app-zone-register',
  templateUrl: './zone-register.component.html',
  styleUrls: ['./zone-register.component.css']
})
export class ZoneRegisterComponent implements OnInit {

  public uri;
  public readonly notifier;
  public municipios:[];

  constructor(private restMunicipioService: RestMunicipioService, private restNotifier:NotifierService) {
    this.notifier = restNotifier;
   }
  ngOnInit(): void {
    this.getMunicipios();
  }

  getMunicipios(){
    this.restMunicipioService.getMunicipios().subscribe((res:any)=>{
      if(res.municipios){
        this.municipios = res.municipios;
        console.log(this.municipios);
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
  

}
