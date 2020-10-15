import { ApiResponse } from './../../models/api-response';
import { Observable } from 'rxjs';
import { ProductModel } from './../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL = '/api/products';
  refreshProducts = new EventEmitter<ProductModel[]>();
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {
    const url = `${this.baseURL}/get`;
    const products = this.httpClient.get<ProductModel[]>(url);
    return products;
  }

  addProduct(product: ProductModel): Observable<ApiResponse> {
    const response = this.getPostResponse('add', product);
    return response;
  }

  deleteProduct(id: number): Observable<ApiResponse> {
    const response = this.getPostResponse('delete', id);
    return response;
  }

  editProduct(product: ProductModel): Observable<ApiResponse> {
    const response = this.getPostResponse('edit', product);
    return response;
  }

  private getPostResponse(urlTail: string, data: any): Observable<ApiResponse> {
    const url = `${this.baseURL}/${urlTail}`;
    const response = this.httpClient.post<ApiResponse>(url, data);
    return response;
  }
}
