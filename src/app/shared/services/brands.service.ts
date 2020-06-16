import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BrandsService {
  constructor(private http: HttpClient) {}

  public getBrands(data: any) {
    const { prices, id } = data;
    const priceRange = prices ? prices : { value: 0, highValue: 2000 };
    return this.http.get(
      `/brands?subCat=${id}&prices=${priceRange.value},${priceRange.highValue}`
    );
  }
}
