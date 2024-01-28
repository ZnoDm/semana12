import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ClienteService } from "../services/cliente.service";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {
  @Input() cliente: any;
  edit = false;

  datos = {
    nombres: "",
    ruc_dni: "",
    direccion: "",
    email: "",
  };


  createFormGroup() {
    return new FormGroup({
      nombres: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      ruc_dni: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      direccion: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zAZ]{2,4}$"),
      ]),
    });
  }

  validation_messages = {
    nombres: [
      { type: "required", message: "Escriba Nombre." },
      { type: "minlength", message: "Nombre maximo de 5 caracteres" },
    ],
    ruc_dni: [
      { type: "required", message: "Escriba RUC/DNI" },
      { type: "maxlength", message: "RUC/DNI es de 8 caracteres" },
    ],
    direccion: [
      { type: "required", message: "Escriba direccion" },
      { type: "maxlength", message: "No puede escribir mas de 100 caracteres" },
    ],
    email: [
      { type: "required", message: "Escribir correo" },
      { type: "pattern", message: "No es un formato de correo" },
    ],
  };
  get nombres() {
    return this.registrarForm.get("nombres");
  }
  get ruc_dni() {
    return this.registrarForm.get("ruc_dni");
  }
  get direccion() {
    return this.registrarForm.get("direccion");
  }
  get email() {
    return this.registrarForm.get("email");
  }

  registrarForm: FormGroup;
  constructor(
    private service: ClienteService,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.registrarForm = this.createFormGroup();
  }
  ngOnInit() {
    if (this.cliente) {
      this.edit = true;
      this.datos = this.cliente;
    }
  }
  cerrarModal(){
    this.modalCtrl.dismiss(null,'cerrado');
    }

  onSubmit() {

    if (this.edit) {
      this.service.Actualizar(this.cliente,this.cliente.cliente_id).subscribe(()=>{
       this.cliente.cliente_id=this.cliente.cliente_id;
       this.modalCtrl.dismiss(this.cliente,'editado');
       });
    }
    else {
      const cliente = this.registrarForm.value;
      this.service.Agregar(cliente).subscribe(response => {
        this.modalCtrl.dismiss(response, 'creado');
        console.log(response);
      });
    }
  }
}
