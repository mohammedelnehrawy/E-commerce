import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }
  myToken: any = localStorage.getItem('userToken');
  baseUrl: string = 'https://ecommerce.routemisr.com';


checkOutPayment(id:string , data:object):Observable<any> {
  return this.httpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
    {
      "shippingAddress" : data,
    }
  );
}



}
