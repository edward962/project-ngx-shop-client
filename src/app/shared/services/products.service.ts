import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductApi } from 'src/app/content/category/store/reducers/products.reducer';
import { Params } from '@angular/router';
import { IFeedback, IProduct } from '../interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public createFeedback(
    feedback: IFeedback,
    product: string
  ): Observable<IProduct> {
    return this.http.post<IProduct>(`/feedbacks`, { ...feedback, product });
  }

  public getProductsBySubCategory({
    currentCategory,
    priceRange,
    searchByName,
    selectedBrands,
  }: Params): Observable<IProductApi> {
    let query = `?subCat=${currentCategory}`;
    if (priceRange && priceRange.length > 0) {
      query += `&prices=${priceRange}`;
    }
    if (searchByName) {
      query += `&text=${searchByName}`;
    }
    if (selectedBrands) {
      query += `&brands=${selectedBrands}`;
    }

    return this.http.get<IProductApi>(`/products/${query}`);
  }

  public getSuggestedProducts(): Observable<IProductApi> {
    return this.http.get<IProductApi>('/products/suggestion');
  }
  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }
}
