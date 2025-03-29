import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iProduct } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<iProduct> {
    return this.http.get<iProduct>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<iProduct[]> {
    return this.http.get<iProduct[]>(
      `${this.apiUrl}/products?category=${category}`
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }
}