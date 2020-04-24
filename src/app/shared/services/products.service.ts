import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}


  public getProducts(): Observable<IProduct> {
    return this.http.get<IProduct>(`/products`);
  }

  public getProductsBySubCategory(id: string, priceData: any): Observable<IProduct> {
    const priceRange = priceData ? priceData : {value: 0, highValue: 1000000000};
    return this.http.get<IProduct>(`/products/?subCat=${id}&prices=${priceRange.value},${priceRange.highValue}`);
  }

  public getProductsByProductName(name: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/?name=${name}`);
  }

  public getProductsFilteredByPrice(query: any, id: string): Observable<IProduct> {
    const {value, highValue} = query;
    return this.http.get<IProduct>(`/products/?prices=${value},${highValue}&subCat=${id}`);
  }

  public getProductById(id): Observable<any>{
    return this.http.get<any>(`/products/${id}`);
  }
}
