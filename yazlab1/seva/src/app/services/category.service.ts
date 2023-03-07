import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //postman api
  apiUrl = 'http://localhost:3000/categories';
  
  constructor(private http: HttpClient) {}


  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
