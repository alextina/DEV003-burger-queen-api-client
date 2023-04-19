import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  apiurl: string = 'https://server-mock-burger-queen.onrender.com/orders';

  postOrder(order: Order): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        // Authorization es una propiedad, con el valor del token que reicibimos al iniciar sesión en el login
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    };

    return this.http.post(this.apiurl, order, httpOptions)
  }

  getOrder(): Observable<Order[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        // Authorization es una propiedad, con el valor del token que reicibimos al iniciar sesión en el login
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    };

    return this.http.get<Order[]>(this.apiurl, httpOptions)
  }

}
