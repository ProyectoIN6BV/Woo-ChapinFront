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
    console.log(this.uri+'addAddress/'+userId, params,{headers:headers})
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

  countUser(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+"countUser", {headers:headers})
    .pipe(map(this.extractData));
  }

  removeAddress(addres, id){
    let params = JSON.stringify(addres);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    let direccion = '{"direccion":'+params+"}";
    return this.http.put(this.uri+'removeAddress/'+id, direccion,{headers:headers})
    .pipe(map(this.extractData))
  }

  getEnvios(userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'getEnvios/'+userId,{headers:headers})
    .pipe(map(this.extractData))
  }
 
  getFac(facId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'getFac/'+facId,{headers:headers})
    .pipe(map(this.extractData))
  }


  getImages(){
    return this.http.get(this.uri+'getImageName/',this.httpOptions)
    .pipe(map(this.extractData))
  }


  setImage(id:string, params:Array<string>, files: Array<File>, token:string, name:string, viejaName){
    return new Promise((resolve, reject)=>{
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+'delteAndUpdate/'+id+'/'+viejaName;
      for(var i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name);
      }
      xhr.onreadystatechange = () =>{
        if(xhr.readyState ==4){
          if(xhr.status == 2){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    })
  }
}
