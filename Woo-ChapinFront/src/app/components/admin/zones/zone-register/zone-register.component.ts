import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestMunicipioService } from 'src/app/services/restMunicipio/rest-municipio.service';
import { Municipio } from 'src/app/models/Municipios';

@Component({
  selector: 'app-zone-register',
  templateUrl: './zone-register.component.html',
  styleUrls: ['./zone-register.component.css']
})
export class ZoneRegisterComponent implements OnInit {

  public uri;
  public readonly notifier;
  public municipios:[];
  public municipio:Municipio;

  constructor(private restMunicipioService: RestMunicipioService, private restNotifier:NotifierService) {
    this.notifier = restNotifier;
    this.municipio = new Municipio('','',null);
   }

  ngOnInit(): void {
    this.getMunicipios();
  }

  getMunicipios(){
    console.log("Llegue por dos");
    console.log(this.municipio);
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
  
  
  updateMunicipio(){
    console.log("Llegue por dps");
    console.log(this.municipio);
    this.restMunicipioService.updateMunicipio(this.municipio, this.municipio._id).subscribe((res:any)=>{
      if(res.updated){
        this.notifier.notify("success", res.message);
        this.getMunicipios();
      }else{
        this.notifier.notify("error", res.message);
        this.getMunicipios();
      }
    }, error=> this.notifier.notify("error", "ocurrió un error en la consulta") );
  }

  selectMunicipio(municipio){
    console.log("Select");
    console.log(municipio);
    this.municipio = municipio;
  }

  removeMunicipio(){
    this.restMunicipioService.removeMunicipio(this.municipio._id).subscribe((res:any)=>{
      console.log(res);
      if(res.muniRemove){
        this.notifier.notify("success", res.message);
        this.getMunicipios();
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", "ocurrió un error en la consulta"))
  }

}
