import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(public http: HttpClient) {}
  id() {
    console.log("llego");
    return this.http.get(
      `${environment.url_api}api/usuario`,
      this.headers()
    );
  }
  buscar_id(id) {
    return this.http.get(
      `${environment.url_api}api/usuario/${id}`,
      this.headers()
    );
  }
  insertar(body) {
    return this.http.post(
      `${environment.url_api}api/usuario/`,
      body,
      this.headers()
    );
  }
  logear(body) {
    return this.http.post(
      `${environment.url_api}api/usuario/login`,
      body,
      this.headers()
    );
  }
  inhabilitar(cuenta) {
    return this.http.put(
      `${environment.url_api}api/usuario/inhabilitar`,
      cuenta,
      this.headers()
    );
  }
  retiros(body) {
    return this.http.put(
      `${environment.url_api}api/usuario/retiros`,
      body,
      this.headers()
    );
  }
  deposito(body) {
    return this.http.put(
      `${environment.url_api}api/usuario/deposito`,
      body,
      this.headers()
    );
  }
  transferencia(body){
    return this.http.put(
      `${environment.url_api}api/usuario/trasnferencia`,
      body,
      this.headers()
    );
  }
  headers() {
    const headers = new HttpHeaders();
    headers.append("Allow-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("Content-Type", undefined);
    const options = { headers: headers, withCredentials: false };
    return options;
  }
}
