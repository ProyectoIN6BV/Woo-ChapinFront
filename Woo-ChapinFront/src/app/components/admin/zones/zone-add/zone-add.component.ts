import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Municipio } from 'src/app/models/Municipios';
import { RestMunicipioService } from 'src/app/services/restMunicipio/rest-municipio.service';

@Component({
  selector: 'app-zone-add',
  templateUrl: './zone-add.component.html',
  styleUrls: ['./zone-add.component.css']
})
export class ZoneAddComponent implements OnInit {

  municipio: Municipio;
  public fileCategory:Array<File>;
  private readonly notifier;
  private token;

  constructor(private restMunicipio: RestMunicipioService, private notifierService: NotifierService){
    this.municipio = new Municipio('','',null);
    this.notifier = notifierService;
    this.token = restMunicipio.getToken();
  }

  ngOnInit(): void {
  }

  addMunicipio(form){
    this.restMunicipio.addMunicipio(this.municipio).subscribe((res:any)=>{
      if(res.muniSaved){
        this.notifier.notify("success", res.message);
        form.reset();
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", error.error.message));
  }

}
