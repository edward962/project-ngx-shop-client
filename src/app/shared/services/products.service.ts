import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/content/category/store/reducers/products.reducer';
import { IFeedback } from 'src/app/content/category/content/product/store/reducers/product.reducer';

@Injectable()
export class ProductsService {
  constructor(
    private http: HttpClient) {
  }

  public createFeedback(feedback: IFeedback, product: string): Observable<IFeedback> {
    return this.http.post<IFeedback>(`/feedbacks`, {...feedback,product});
  }

  public getProductsBySubCategory(
    // tslint:disable-next-line: no-any
    search: any,
  ): Observable<IProduct> {
    const {
      id,
      priceRange,
      searchByName,
      selectedBrands,
    } = search;
    const subCat = id ? id : '';
    const productName = searchByName ? searchByName : '';
    const selectedBrandsQuery = selectedBrands ? selectedBrands : '';
    const priceData = priceRange
      ? priceRange
      : { value: 0, highValue: 1000000000 };
    return this.http.get<IProduct>(
      `/products/?subCat=${subCat}&brands=${selectedBrandsQuery}&prices=${priceData.value},${priceData.highValue}&text=${productName}`,
    );
  }

  public getSuggestedProducts(): Observable<IProduct> {
    return this.http.get<IProduct>('/products/suggestion');
  }
  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }
}
