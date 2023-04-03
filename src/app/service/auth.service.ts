import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiurl = 'http://localhost:3000/login';

  methodLogin(email: string, password: string): Observable<any> {
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
