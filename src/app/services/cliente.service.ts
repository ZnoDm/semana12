import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Cliente {
  cliente_id?: number;
  ruc_dni?:    string;
  nombres?:    string;
  email?:      string;
  direccion?:  string;
  estado?:     number;
  apellidos?:  string;
  url?:        string;
}


@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private url='http://localhost:8000/api/listado';
  constructor(private http:HttpClient ) { }
  ObtenerTodos(){
  return this.http.get<[Cliente]>(this.url);
  }
  Obtener(cliente_id:number)
  {
  return this.http.get<[Cliente]>(this.url+'/'+cliente_id);
  }
  Agregar(cliente:Cliente){
  return this.http.post(this.url,cliente);
  }
  Actualizar(cliente:Cliente,cliente_id:number){
  return this.http.put(this.url+'/'+ cliente_id,cliente);
  }
  Borrar(cliente_id:number){
  return this.http.delete(this.url+'/'+ cliente_id);
  }
}
