import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  URL:string = "http://localhost:8082/api/funds/";

  constructor(private httpClient: HttpClient) { }

  deleteFund(id: number):Observable<any>{
    return this.httpClient.delete(this.URL+id);
  }
}
