import { Component, OnInit, Input, Output } from "@angular/core";
import swal from "sweetalert";
import { UsuarioService } from "./usuario.service";
import { HomeComponent } from "./components/home/home.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app-bancaria";
 mostrar=true;
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
  form_login = {
    correo: "",
    password_login: "",
  };

  constructor(private _apiUsuario: UsuarioService) {}
  ngOnInit() {
    this.cargarId();
  }
  reset_registro() {
    this.form_registro = {
      usuario_id: null,
      nombres: "",
      identificacion: "",
      correo: "",
      password: "",
      monto: "",
      cuenta: "",
      habilitado: true,
    };
  }
  reset_login() {
    this.form_login = {
      correo: "",
      password_login: "",
    };
  }
  cargarId() {
    this._apiUsuario.id().subscribe((data) => {
      console.log(data);
      if (data[0].max === null) {
        this.form_registro.usuario_id = 1;
      } else {
        this.form_registro.usuario_id = data[0].max + 1;
      }
      console.log(data[0].max + 1);
    });
  }
  crear_usuario() {
    if (this.form_registro.nombres) {
      if (this.form_registro.identificacion) {
        if (this.form_registro.correo) {
          if (validar_email(this.form_registro.correo)) {
            if (this.form_registro.password) {
              if (validar_password(this.form_registro.password)) {
                let num = 0;
                num = numero_aleatorio();
                this.form_registro.cuenta = String(num);
                this.form_registro.monto = "1000000";

                this._apiUsuario.insertar(this.form_registro).subscribe(
                  (data) => {
                    swal("Registro", `${data["msg"]}`, "success", {
                      buttons: { Cancel: false, Ok: false },
                      timer: 3000,
                    });
                    this.reset_registro();
                  },
                  (err) => {
                    swal("Error del Registro", `${err["msg"]}`, "error");
                  }
                );
              } else {
                swal(
                  "Nombre",
                  "Por favor verifique el campo password: Recuerde que la contraseña debe tener letras y números.",
                  "error"
                );
              }
            } else {
              swal(
                "Password",
                "Por favor verifique el campo Password.",
                "error"
              );
            }
          } else {
            swal(
              "Correo",
              "Por favor verifique el campo Correo, debe tener una extensión:  @gmail.com,@hotmail.com, @outlook.com, etc.",
              "error"
            );
          }
        } else {
          swal("Correo", "Por favor verifique el campo Correo.", "error");
        }
      } else {
        swal(
          "No.Idenficación",
          "Por favor verifique el campo No.Idenficación.",
          "error"
        );
      }
    } else {
      swal("Nombres", "Por favor verifique el campo Nombres.", "error");
    }
  }
  eye(name) {
    var x = [];
    var y = [];
    x.push(document.getElementById(name));
    y.push(document.getElementById("eyepassword"));

    if (x[0].type === "password") {
      x[0].type = "text";
      y[0].className = "fas fa-eye-slash";
    } else {
      x[0].type = "password";
      y[0].className = "fas fa-eye";
    }
  }
  logearse() {
    if (this.form_login.correo) {
      if (this.form_login.password_login) {
        this._apiUsuario.logear(this.form_login).subscribe(
          (data) => {
            swal("Exito!", "ingreso", "success");
            this.reset_login();
            window.localStorage.setItem("user", JSON.stringify(data["msg"][0]));
            this.mostrar=false;
          },
          (err) => {
            swal("Error", `${err.error["msg"]}`, "error");
          }
        );
      } else {
        swal("Contraseña", "Por favor verifique el campo Contraseña.", "error");
      }
    } else {
      swal("Correo", "Por favor verifique el campo correo.", "error");
    }
  }
}
function numero_aleatorio() {
  let num = Math.trunc(Math.random() * 1234567891);
  return String(num).length != 10 ? numero_aleatorio() : num;
}
function validar_email(email) {
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email) ? true : false;
}
function validar_password(pass) {
  var patt = /^(?=[A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]{1,30}$/;
  return patt.test(pass) ? true : false;
}
