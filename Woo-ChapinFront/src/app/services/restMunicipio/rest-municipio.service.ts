import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
    providedIn: 'root'
  })

  export class RestMunicipioService{
    public uri: string;
    public token;
    public municipio;
    public status;
  
    public httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }    
  
    public httpOptionsAuth = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    }
    
    private extractData(res:Response){
      let body = res;
      return body || [] || {};
    }
  
    public getToken(){
      let token = localStorage.getItem("token");
      if(token != null || token != undefined){
        this.token = token;
      }else{
        this.token = null;
      }
  
      return this.token;      
    }

    constructor(private http:HttpClient) { 
        this.uri = CONNECTION.URI;
      }

    addMunicipio(municipio){
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        })
        let params = JSON.stringify(municipio);
        return this.http.post(this.uri+'createMunicipio',params,{headers: headers})
        .pipe(map(this.extractData));
      }

      getMunicipios(){
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        })        
        return this.http.get(this.uri+"getMunicipios",{headers: headers})
        .pipe(map(this.extractData))
      }
  }