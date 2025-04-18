import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpclinet: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.httpclinet.get(
      'https://ecommerce.routemisr.com/api/v1/brands'
    );
  }
  getSpecifBrands(id: string): Observable<any> {
    return this.httpclinet.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
  }  
}
