export interface IProducto {
  producto_id: number;
  descripcion: string;
  precio: number;
  foto: string;
  estado: number;
  cantidad: number;
}

export class Producto implements IProducto {

  producto_id: number = 0;
  descripcion: string = '';
  precio: number = 0;
  foto: string = '';
  estado: number = 1;
  cantidad: number = 0;

  constructor(res?:any) {
    Object.assign(this,res)
  }
}
