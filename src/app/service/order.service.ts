import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // posts?title=json-server

  postOrder(order: Order): Observable<any> {
    const apiurl: string = `https://burger-queen-server-mock-21hr.onrender.com/orders`;
    const httpOptions = {
      headers: new HttpHeaders({
        // Authorization es una propiedad, con el valor del token que reicibimos al iniciar sesión en el login
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    };

    return this.http.post(apiurl, order, httpOptions);
  }

  getOrder(status: string): Observable<Order[]> {
    const apiurl: string = `https://burger-queen-server-mock-21hr.onrender.com/orders?status=${status}&_sort=dataEntry&_order=asc`;
    // posts?_sort=views&_order=asc
    const httpOptions = {
      headers: new HttpHeaders({
        // Authorization es una propiedad, con el valor del token que reicibimos al iniciar sesión en el login
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    };

    return this.http.get<Order[]>(apiurl, httpOptions);
  }
}
