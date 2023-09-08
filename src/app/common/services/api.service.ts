import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://dev-api.evitalrx.in/v1/patient/medicines/search';
  private apiKey = 'dwkoortGX8DVYzLP559sGJeWty4wX0de';

  constructor(private http:HttpClient) { }

  medcine(searchString: string) {
    const payload = {
      apikey: this.apiKey, 
      searchstring: searchString
    };
    return this.http.post(this.apiUrl, payload);
 }
}
