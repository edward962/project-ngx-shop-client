import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BrandsService {
  constructor(private http: HttpClient) {}

  public getBrands({ prices, id }: any) {
    const priceRange = prices.length > 0 ? prices : [0, 2000];
    return this.http.get(
      `/brands?subCat=${id}&prices=${priceRange[0]},${priceRange[1]}`
    );
  }
}
