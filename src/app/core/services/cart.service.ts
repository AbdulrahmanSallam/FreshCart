import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/cart/`;
  cartItemsCount: BehaviorSubject<number> = new BehaviorSubject(0);
  getCartProducts(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }
  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl, {
      productId: productId,
    });
  }
  removeProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `${productId}`);
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl);
  }
  updateProductQuantity(productId: string, quantity: number): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `${productId}`, {
      count: quantity,
    });
  }
  // payment
  checkoutSession(cartId: string, userInfo: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: userInfo }
    );
  }

  getAllOrders(userId: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }
}
