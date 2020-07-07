import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductApi } from 'src/app/content/category/store/reducers/products.reducer';
import { Params } from '@angular/router';
import { IFeedback, IProduct } from '../interfaces/product.inteface';

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
    if (priceRange.length > 0) {
      return this.http.get<IProductApi>(
        `/products/?subCat=${currentCategory ?? ''}&brands=${
          selectedBrands ?? ''
        }&prices=${priceRange[0]},${priceRange[1]}&text=${searchByName ?? ''}`
      );
    } else {
      return this.http.get<IProductApi>(
        `/products/?subCat=${currentCategory}&brands=${
          selectedBrands ?? ''
        }&text=${searchByName ?? ''}`
      );
    }
  }

  public getSuggestedProducts(): Observable<IProductApi> {
    return this.http.get<IProductApi>('/products/suggestion');
  }
  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }
}
