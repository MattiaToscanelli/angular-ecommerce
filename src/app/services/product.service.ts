import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8080/api/products';
  private categoryURL = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchURL);
  }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductsCategory>(this.categoryURL).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string) : Observable<Product[]> {
    const searchURL = `${this.baseURL}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchURL);
  }

  getProduct(productId: number) : Observable<Product> {
    const productURL = `${this.baseURL}/${productId}`;
    return this.httpClient.get<Product>(productURL);
  }

  private getProducts(searchURL: string) : Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchURL).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
