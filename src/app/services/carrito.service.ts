import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  private url='http://localhost:8000/api/carrito/save';
  constructor(private http:HttpClient ) { }
  save(data:any){
    return this.http.post(this.url, data);
  }

}
//
