import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  URL:string = "http://localhost:8082/api/funds/";

  constructor(private httpClient: HttpClient) { }

  createFund(fund: object): Observable<any> {
    return this.httpClient.post(this.URL, fund)
  }
}
