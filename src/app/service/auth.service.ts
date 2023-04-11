import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // declarando dependencias que usaremos en la clase
  constructor(private http: HttpClient) {}
  // Declarando e inicializando variable apiurl que se usará para consultar a json-server-auth
  apiurl: string = 'http://localhost:8080/login';

  // Método que devuelve un observable: (es una colección de futuros valores=Promesa )
  methodLogin(email: string, password: string): Observable<any> {
    // Accediendo al método post  de la variable http de HttpClient que recibe como parámetros la url y el body de la solicitud (objeto con propiedades email y password recibidos como parámetros)
    return this.http.post(this.apiurl, {
      email: email,
      password: password,
    });
  }

  GetAll() {
    return this.http.get(this.apiurl);
  }

  GetByCode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }

  ContinueRegister(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  UpdateUser(code: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + code, inputdata);
  }
}
