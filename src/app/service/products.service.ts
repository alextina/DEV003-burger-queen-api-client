import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Llamando a las dependencias que vamos a usar
  constructor(private http: HttpClient) { }
  // Declarando e inicializando la variable apiurl
  private apiurl: string =
    'https://burger-queen-server-mock-21hr.onrender.com/products';

  httpOptions = {
    // Se decalra variable y se inicializa con un objeto para la autorización
    headers: new HttpHeaders({
      // Authorization es una propiedad, con el valor del token que reicibimos al iniciar sesión en el login
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    }),
  }

  postProduct(product: Products): Observable<any> {
    return this.http.post<Products>(this.apiurl, product, this.httpOptions)
  }

  // El método no tiene parámtros y devuelve un Observable que es un array de Products (../interfaces/products.interface)
  getProducts(): Observable<Products[]> {
    // Devuelve un Observable que es obtenido del método 'get' de httpClient (http)
    // el cual recibe como parametros la 'url' y el 'httpOptions)
    return this.http.get<Products[]>(this.apiurl, this.httpOptions);
  }

  putProduct(id: string, product: Products): Observable<Products> {
    return this.http.put<Products>(`${this.apiurl}/${id}`, product, this.httpOptions)
  }

}
