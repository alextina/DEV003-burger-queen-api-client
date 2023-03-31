import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiurl = 'http://localhost:3000/';
  GetAll() {
    return this.http.get(this.apiurl);
  }
  Getbycode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }

  ContinueRegister(inputData: any) {
    return this.http.post(this.apiurl, inputData);
  }
  UpdateRegister(code: any, inputData: any) {
    return this.http.put(this.apiurl + '/' + code, inputData);
  }
}
