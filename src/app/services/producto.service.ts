import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private url='http://localhost:8000/api/producto';
  constructor(private http:HttpClient ) { }
  listarProductos(){
    return this.http.get<[Producto]>(this.url);
  }

}
//
