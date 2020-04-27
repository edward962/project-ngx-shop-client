import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BrandsService {
  constructor(private http: HttpClient) {}

public getBrands(id: string) {
    return this.http.get(`/brands?id=${id}`);
  }
}
