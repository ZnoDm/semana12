import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarPage } from '../agregar/agregar.page';

export interface Cliente {
  cliente_id?: number;
  ruc_dni?: string;
  nombres?: string;
  email?: string;
  direccion?: string;
  estado?: number;
  apellidos?: string;
  url?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  clientes: any = []
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController

  ) { }

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.ObtenerTodos().subscribe(
      (data: any) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al obtener clientes', error);
      }
    );
  }

  agregar() {
    this.modalCtrl.create({
      component: AgregarPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data, role }) => {
        if (role === 'creado') {
          this.clienteService.ObtenerTodos().subscribe(
            (response: any) => {
              this.clientes = response;
            });
        }
      });

  }

  editar(cliente: any) {
    this.modalCtrl.create({
      component: AgregarPage,
      componentProps: { cliente }
    })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        this.clientes = this.clientes.filter((std: any) => {
          if (data.id === std.cliente_id) {
            return data;
          }
          return std;
        })
      });

  }
  eliminar(cliente_id: number) {
    this.alertCtrl.create({
      header: 'Borrar',
      message: 'Esta seguro de eliminar?' + cliente_id,
      buttons: [{
        text: 'SI',
        handler: () => {
          this.clienteService.Borrar(cliente_id).subscribe(() => {
            this.clientes = this.clientes.filter((std: any) => std.cliente_id !== cliente_id);
          });
        }
      },
      {
        text: 'NO'
      }]
    }).then(alertEl => alertEl.present());
  }

}
