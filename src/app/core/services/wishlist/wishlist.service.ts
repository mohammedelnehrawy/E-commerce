import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseUrl: string = 'https://ecommerce.routemisr.com';

  cartNumber: WritableSignal<number> = signal(0);

  constructor(private httpClient: HttpClient) {}

  addItemToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/wishlist`);
  }
  

   removeCartItem(id: string): Observable<any> {
      return this.httpClient.delete(`${this.baseUrl}/api/v1/wishlist/${id}`);
    }
}
