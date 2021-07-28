import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
    providedIn: 'root'
  })

export class RestCategoriaService{
    public uri: string;

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

    
}