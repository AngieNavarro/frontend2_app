import { Component, OnInit, Input, Output } from "@angular/core";
import { ModalComponent } from "../../components/modal/modal.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert";
import { UsuarioService } from "../../usuario.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  nombre: "";
  mostrar = false;
  modalRef: BsModalRef;
  form_registro = {
    usuario_id: null,
    nombres: "",
    identificacion: "",
    correo: "",
    password: "",
    monto: "",
    cuenta: "",
    habilitado: true,
  };
  constructor(
    private modalService: BsModalService,
    private _apiUsuario: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }
  salir() {
    this.mostrar = true;
  }
  cargarDatos() {
    const usuario = JSON.parse(window.localStorage.getItem("user"));

    this._apiUsuario.buscar_id(usuario.usuario_id).subscribe((data) => {
      console.log(data);
      this.form_registro.usuario_id = data[0].usuario_id;
      this.form_registro.nombres = data[0].nombres;
      this.form_registro.identificacion = data[0].identificacion;
      this.form_registro.correo = data[0].correo;
      this.form_registro.cuenta = data[0].cuenta;
      this.form_registro.monto = data[0].monto;
      this.form_registro.habilitado = data[0].habilitado;
    });
  }
  Depositos() {
    this.modalRef = this.modalService.show(ModalComponent, {
      initialState: {
        title: "Depositos",
        cuenta: this.form_registro.cuenta,
        saldo_actual: Number(this.form_registro.monto),
      },
      animated: true,
      ignoreBackdropClick: true,
    });

    this.modalService.onHidden.subscribe((data) => {
      this.ngOnInit();
    });
  }
  Retiros() {
    this.modalRef = this.modalService.show(ModalComponent, {
      initialState: {
        title: "Retiros",
        cuenta: this.form_registro.cuenta,
        saldo_actual: Number(this.form_registro.monto),
      },
      animated: true,
      ignoreBackdropClick: true,
    });

    this.modalService.onHidden.subscribe((data) => {
      this.ngOnInit();
    });
  }
  Trasnferencias() {
    this.modalRef = this.modalService.show(ModalComponent, {
      initialState: {
        title: "Transferencias",
        cuenta: this.form_registro.cuenta,
      },
      animated: true,
      ignoreBackdropClick: true,
    });

    this.modalService.onHidden.subscribe((data) => {
      this.ngOnInit();
    });
  }
  Inhabilitar_cuenta() {
    swal({
      title: `Desactivar Cuenta`,
      text: `¿Seguro que desea eliminar la cuenta ${this.form_registro.cuenta}?`,
      icon: "warning",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._apiUsuario.inhabilitar(this.form_registro).subscribe(
          (data) => {
            swal({ title: "Exito", text: data["msg"], icon: "success" });
            this.cargarDatos();
          },
          (err) => {
            swal({ title: "Error", text: err["msg"], icon: "error" });
            this.cargarDatos();
          }
        );
      } else {
        swal({
          title: `Cancelado`,
          text: `La eliminación de la cuneta  ${this.form_registro.cuenta} ha sido cancelada`,
          icon: "info",
        });
      }
    });
  }
}
