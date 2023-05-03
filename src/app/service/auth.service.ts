import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // declarando dependencias que usaremos en la clase
  constructor(private http: HttpClient) { }
  // Declarando e inicializando variable apiurl que se usará para consultar a json-server-auth
  apiurl: string = 'https://burger-queen-server-mock-21hr.onrender.com/login';
  apiurlUsers: string = 'https://burger-queen-server-mock-21hr.onrender.com/users';
  // apiurl: string = 'http://localhost:8080/login';
  // apiurlUsers: string = 'http://localhost:8080/users';
  httOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    }),
  };
  // Método que devuelve un observable: (es una colección de futuros valores=Promesa )
  methodLogin(email: string, password: string): Observable<any> {
    // Accediendo al método post  de la variable http de HttpClient que recibe como parámetros la url y el body de la solicitud (objeto con propiedades email y password recibidos como parámetros)
    return this.http.post(this.apiurl, {
      email: email,
      password: password,
    });
  }

  postUser(user: User): Observable<any> {
    return this.http.post<User>(this.apiurlUsers, user, this.httOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiurlUsers, this.httOptions);
  }

  putUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiurlUsers}/${id}`,
      user,
      this.httOptions
    );
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiurlUsers}/${id}`, this.httOptions);
  }

  // métodos utilizados por el componente 'register'
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
