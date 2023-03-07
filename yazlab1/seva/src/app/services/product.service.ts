import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  
  getAllProductsCategoryId(categoryId: number): Observable<Product[]> {
    let apiCategoryId = this.apiUrl + '?categoryId=' + categoryId;
    return this.http.get<Product[]>(apiCategoryId);
  }

  //Ürün ekleme
  addAllProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  //ürün Sil
  getClearProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl + '/' + product.id);
  }

  // Ürün detay
  getProductDetails(pId: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/' + pId)
  }
}
