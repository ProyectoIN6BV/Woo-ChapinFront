import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestCartService {
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

  addProductCart(userId, productId, cantidad){
    let data = {
      "cantidad": cantidad
    }

    let params = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    
    return this.http.post(this.uri+userId+"/agregarCarrito/"+productId,params,{headers:headers})
    .pipe(map(this.extractData));

  }


  getCarrito(userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+userId+"/viewCarrito",{headers:headers})
    .pipe(map(this.extractData));
  }

  deleteValor(userId, productId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.getToken()
    })
    return this.http.put(this.uri+userId+"/deleteProductoCarrito/"+productId,{},{headers:headers})
    .pipe(map(this.extractData));
  }

}
