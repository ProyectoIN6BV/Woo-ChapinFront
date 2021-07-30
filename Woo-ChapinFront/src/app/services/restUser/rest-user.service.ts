import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri: string;
  public token;
  public userId;
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

  register(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'register', params, this.httpOptions)
    .pipe(map(this.extractData));
  }
  
  login(user, param){
    user.getToken = param;
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'login', params, this.httpOptions)
    .pipe(map(this.extractData));
  }
    
  editarCuenta(product, userId){
    let params = JSON.stringify(product);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'editAccount/'+userId, params,{headers:headers})
    .pipe(map(this.extractData))
  }

  agregarDireccion(direccion, userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let data = {
      "direccion" : direccion
    }
    let params = JSON.stringify(data);
    return this.http.put(this.uri+'addAddress/'+userId, params,{headers:headers})
    .pipe(map(this.extractData))
  }

  
  getDirecciones(userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'getusers/'+userId,{headers:headers})
    .pipe(map(this.extractData))
  }
}
