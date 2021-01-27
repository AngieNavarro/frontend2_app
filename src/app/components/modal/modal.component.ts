import { Component, OnInit, Input } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { UsuarioService } from "../../usuario.service";
import swal from "sweetalert";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  @Input() title;
  @Input() cuenta;
  @Input() saldo_actual;
  form = {
    cuenta: "",
    saldo: "",
  };
  form_transferencia = {
    cuenta: "",
    saldo: "",
    cuenta_externa: "",
  };

  constructor(
    public bsModalRef: BsModalRef,
    private _apiUsuario: UsuarioService
  ) {}

  ngOnInit(): void {}
  reset() {
    this.form = {
      cuenta: "",
      saldo: "",
    };
  }
  guardar() {
    if (this.title == "Retiros") {
      if (this.form.saldo) {
        this.form.cuenta = this.cuenta;
        console.log(this.form);
        this._apiUsuario.retiros(this.form).subscribe(
          (data) => {
            swal({ title: "Retirado", text: data["msg"], icon: "success" });
            setTimeout(() => {
              this.bsModalRef.hide();
            }, 2000);
            this.reset();
          },
          (err) => {
            swal({ title: "Error", text: err["msg"], icon: "error" });
          }
        );
      } else {
        swal("Saldo Retiros", "Por favor verifique el campo saldo.", "error");
      }
    }
    if (this.title == "Depositos") {
      if (this.form.saldo) {
        this.form.cuenta = this.cuenta;
        console.log(this.form);
        this._apiUsuario.deposito(this.form).subscribe(
          (data) => {
            swal({ title: "Depositado", text: data["msg"], icon: "success" });
            setTimeout(() => {
              this.bsModalRef.hide();
            }, 2000);
            this.reset();
          },
          (err) => {
            swal({ title: "Error", text: err["msg"], icon: "error" });
          }
        );
      } else {
        swal("Saldo Deposito", "Por favor verifique el campo saldo.", "error");
      }
    }
  }
  transferir() {
    if (this.form_transferencia.saldo) {
      if (this.form_transferencia.cuenta_externa) {
        this.form_transferencia.cuenta = this.cuenta;
        console.log(this.form_transferencia);
        this._apiUsuario.transferencia(this.form_transferencia).subscribe(
          (data) => {
            swal({
              title: "Transferencia",
              text: data["msg"],
              icon: "success",
            });
            setTimeout(() => {
              this.bsModalRef.hide();
            }, 2000);
            this.reset();
          },
          (err) => {
            swal({ title: "Error", text: err["msg"], icon: "error" });
          }
        );
      } else {
        swal("No. Cuenta", "Por favor verifique el campo No. Cuenta.", "error");
      }
    } else {
      swal("Saldo", "Por favor verifique el campo saldo.", "error");
    }
  }
}
