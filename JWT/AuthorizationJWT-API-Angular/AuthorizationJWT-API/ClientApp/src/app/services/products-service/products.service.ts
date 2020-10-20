import { ApiResponse } from './../../models/api-response';
import { Observable } from 'rxjs';
import { ProductModel } from './../../models/product.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  deleteProduct(id: number): Observable<ProductModel[]> {
    const response = this.httpClient.post<ProductModel[]>(`${this.baseURL}/delete`, { id: id });
    return response;
  }

  editProduct(product: ProductModel): Observable<ApiResponse> {
    const response = this.getPostResponse('edit', product);
    return response;
  }

  searchProduct(search: string): Observable<ProductModel[]> {
    const params = new HttpParams().set('search', search);
    const response = this.httpClient.get<ProductModel[]>(`${this.baseURL}/search`, {
      params: params
    });
    return response;
  }

  private getPostResponse(urlTail: string, data: any): Observable<ApiResponse> {
    const url = `${this.baseURL}/${urlTail}`;
    const response = this.httpClient.post<ApiResponse>(url, data);
    return response;
  }
}
