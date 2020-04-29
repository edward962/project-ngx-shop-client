import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IPriceData } from 'src/app/interfaces/product.interface';
import { IFeedback } from 'src/app/content/main-content/store/reducers/products.reducer';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public createFeedback(feedback: IFeedback): Observable<IFeedback> {
    return this.http.post<IFeedback>(`/feedbacks`, feedback);
  }

  public getProducts(): Observable<IProduct> {
    return this.http.get<IProduct>(`/products`);
  }

  public getProductsBySubCategory(
    id: string,
    priceData: IPriceData,
    searchByName: string,
    selectedBrands: string | undefined
  ): Observable<IProduct> {
    const productName = searchByName ? searchByName : '';
    const selectedBrandsQuery = selectedBrands ? selectedBrands : '';
    const priceRange = priceData
      ? priceData
      : { value: 0, highValue: 1000000000 };
    return this.http.get<IProduct>(
      `/products/?subCat=${id}&prices=${priceRange.value},${priceRange.highValue}&text=${productName}&brands=${selectedBrandsQuery}`
    );
  }

  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }
}
