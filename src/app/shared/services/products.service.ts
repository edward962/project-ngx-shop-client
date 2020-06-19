import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductApi } from 'src/app/content/category/store/reducers/products.reducer';
import { ISuggestedProductsApi } from 'src/app/content/home/store/reducers/suggested-products.reducer';
import { Params } from '@angular/router';
import { IFeedback, IProduct } from '../interfaces/product.inteface';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public createFeedback(
    feedback: IFeedback,
    product: string
  ): Observable<IFeedback> {
    return this.http.post<IFeedback>(`/feedbacks`, { ...feedback, product });
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

  public getSuggestedProducts(): Observable<ISuggestedProductsApi> {
    return this.http.get<ISuggestedProductsApi>('/products/suggestion');
  }
  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }
}
