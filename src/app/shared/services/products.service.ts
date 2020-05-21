import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFeedback, IProduct } from 'src/app/store/reducers/products.reducer';

@Injectable()
export class ProductsService {
  constructor(
    private http: HttpClient) {
  }

  public createFeedback(feedback: IFeedback): Observable<IFeedback> {
    return this.http.post<IFeedback>(`/feedbacks`, feedback);
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
    const productName = searchByName ? searchByName : '';
    const selectedBrandsQuery = selectedBrands ? selectedBrands : '';
    const priceData = priceRange
      ? priceRange
      : { value: 0, highValue: 1000000000 };
    return this.http.get<IProduct>(
      `/products/?subCat=${id}&brands=${selectedBrandsQuery}&prices=${priceData.value},${priceData.highValue}&text=${productName}`,
    );
  }

  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }
}
