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

  public getProductsBySubCategory(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/?subCat=${id}`);
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
