import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/products/`;
  getProducts(pageNumber: number = 1): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `?limit=30&page=${pageNumber}`);
  }
  getProductDetails(productId: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `${productId}`);
  }
}
