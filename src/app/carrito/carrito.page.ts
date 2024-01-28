import { Component, OnInit } from '@angular/core';
import { itemCarrito } from '../models/itemCarrito';
import { ModalController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { CarritoService } from '../services/carrito.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  listaItemsCarrito: itemCarrito[] | undefined;
  public total = 0;
  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private modalController: ModalController,
    private toastrService: ToastrService,
  ) { }
  ngOnInit() {
    this.MuestraCarrito();
  }
  VaciarCarrito() {
    localStorage.clear();
    this.total = 0;
    this.listaItemsCarrito = [];
  }
  eliminarProductoCarrito(i: number) {
    let carritoStorage = localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);
    carrito.splice(i, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.MuestraCarrito();
  }
  MuestraCarrito() {
    let carritoStorage = localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);
    this.listaItemsCarrito = carrito;
    this.TotalCarrito();
  }
  TotalCarrito() {
    let carritoStorage = localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);
    let suma = 0;
    for (var i = 0; i < carrito.length; i++) {
      suma += carrito[i].precio * carrito[i].cantidad;
    }
    this.total = suma;
  }

  cerrarModal(){
    this.modalController.dismiss(null);
  }

  GuardarCarrito(){
    let carritoStorage = localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);
    //Asumiendo que existe un cliente logeado y su id Cliente es :3
    this.carritoService.save({
      'cliente_id' : 3,
      'productos' : this.listaItemsCarrito}).subscribe(
      (data: any) => {
        if(data.ok == true){
          this.toastrService.presentToast(`Carrito registrado con éxito`);
          this.VaciarCarrito();
          this.cerrarModal();
        }
        else{
          this.toastrService.alertaInformativa(`Ocurrio un error ${data.message}`);
        }
      },
      (error) => {
        console.error('Error al obtener clientes', error);
      }
    );
  }
}
