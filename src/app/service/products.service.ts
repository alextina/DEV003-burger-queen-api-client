import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  apiurl = 'http://localhost:8080/products';

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiurl);
  }
}
