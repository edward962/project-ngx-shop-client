import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public createFeedback(feedback: any): Observable<any> {
    console.log(feedback, '111');
    return this.http.post<any>(`/feedbacks`, feedback);
  }

  public getProducts(): Observable<IProduct> {
    return this.http.get<IProduct>(`/products`);
  }

  public getProductsBySubCategory(
    id: string,
    priceData: any,
    searchByName: string
  ): Observable<IProduct> {
    const productName = searchByName ? searchByName : '';
    const priceRange = priceData
      ? priceData
      : { value: 0, highValue: 1000000000 };
    return this.http.get<IProduct>(
      `/products/?subCat=${id}&prices=${priceRange.value},${priceRange.highValue}&text=${productName}`
    );
  }

  public getProductById(id): Observable<any> {
    return this.http.get<any>(`/products/${id}`);
  }
}
