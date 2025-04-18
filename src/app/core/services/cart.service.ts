import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = 'https://ecommerce.routemisr.com';

  cartNumber: WritableSignal<number> = signal(0);

  constructor(private httpClient: HttpClient) {}

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/cart`);
  }

  removeCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`);
  }
  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/api/v1/cart/${id}`, {
      count: newCount,
    });
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/cart/`);
  }
}
