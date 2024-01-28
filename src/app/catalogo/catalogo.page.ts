import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { itemCarrito } from '../models/itemCarrito';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from '../services/toastr.service';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  productos: Producto[] | undefined;
  quantity: number;
  cantidadItemsCarrito: number = 0;
  constructor(
    private productoService: ProductoService,
    private router: Router,
    private toastrService: ToastrService,
    private modalController: ModalController
  ) {
    this.quantity = 1;
  }
  ngOnInit() {
    this.productoService.listarProductos().subscribe((resp: any) => {
      this.productos = resp;
    })
    this.actualizarCantidadItemsCarrito();

  }

  verCarrito(){
    this.modalController.create({
      component: CarritoPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data, role }) => {
        this.productoService.listarProductos().subscribe((resp: any) => {
          this.productos = resp;
          this.actualizarCantidadItemsCarrito();
        })

      });

  }

  actualizarCantidadItemsCarrito() {
    const carritoString = localStorage.getItem('carrito');
    if (carritoString) {
      const carrito = JSON.parse(carritoString);
      let cantidadTotal = 0;
      carrito.forEach((producto: any) => {
        cantidadTotal += producto.cantidad;
      });
      this.cantidadItemsCarrito = cantidadTotal;
    }
  }

  addCarrito(producto: Producto) {
    console.log(producto)
    let iCarrito: itemCarrito = {
      producto_id: producto.producto_id,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: 1
    }
    if (localStorage.getItem("carrito") === null) {
      let carrito: itemCarrito[] = [];
      carrito.push(iCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    else {
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = JSON.parse(carritoStorage);
      let index = -1;
      for (let i = 0; i < carrito.length; i++) {
        let filaC: itemCarrito = carrito[i];
        if (iCarrito.producto_id === filaC.producto_id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        carrito.push(iCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito))
      }
      else {
        let itemcarrito: itemCarrito = carrito[index];
        itemcarrito.cantidad!++;
        carrito[index] = itemcarrito;
        localStorage.setItem("carrito", JSON.stringify(carrito))
      }
    }
    this.actualizarCantidadItemsCarrito();
    this.toastrService.presentToast(`Producto ${producto.descripcion} agregado al carrito`);
  }


}
