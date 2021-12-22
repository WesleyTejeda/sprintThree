import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatchService {
  URL:string = "http://localhost:8082/api/funds/";

  constructor(private httpClient: HttpClient) { }

  patchFund(fund:object, id:number): Observable<any> {
    return this.httpClient.patch(this.URL+id, fund);
  }
}
