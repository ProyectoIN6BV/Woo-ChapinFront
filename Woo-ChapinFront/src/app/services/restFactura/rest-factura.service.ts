import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestFacturaService {

  public uri: string;
  public token;
  public user;
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

  public getUser(){
    let user = JSON.parse(localStorage.getItem("user"));
    if(user != null || user != undefined){
      this.user = user;
    }else{
      this.user = null;
    }

    return this.user;
  }

  constructor(private http:HttpClient) { 
    this.uri = CONNECTION.URI;
  }


  crearFactura(userId, NIT){
    let data = {
      "nit": NIT
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    let params = JSON.stringify(data);
    console.log(params)
    return this.http.post(this.uri+userId+"/crearFactura",params,{headers:headers})
    .pipe(map(this.extractData));

  }

}

  countPedido(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+"countPedido", {headers:headers})
    .pipe(map(this.extractData));
  }
}