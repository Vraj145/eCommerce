import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  medcine(payload: any){
    return this.http.post('https://dev-api.evitalrx.in/v1/patient/medicines/search',payload)
  }
}
