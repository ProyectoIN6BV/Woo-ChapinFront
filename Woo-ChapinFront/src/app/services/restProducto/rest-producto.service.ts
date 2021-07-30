import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestProductoService {
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
   
  setImage(idProd:string, params:Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject)=>{
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+'uploadImgProd/'+idProd;
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

  saveProduct(producto){
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.post(this.uri+"createProduct",params,{headers:headers})
    .pipe(map(this.extractData))
  }


  getProducts(){
    return this.http.get(this.uri+"getProducts", this.httpOptions)
    .pipe(map(this.extractData));
  }

  updateProducts(product, productId){
    let params = JSON.stringify(product);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'updateProduct/'+productId, params,{headers:headers})
    .pipe(map(this.extractData))
  }

  removeProduct(productId){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'deleteProduct/'+productId, {},{headers:headers})
    .pipe(map(this.extractData))
  }

}
