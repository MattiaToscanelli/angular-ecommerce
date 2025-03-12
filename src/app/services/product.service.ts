import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchURL).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
