import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '@root-store/reducers/categories.reducer';

@Injectable()
export class CategoriesService {
	public constructor(private http: HttpClient) {}

	public getCategories(): Observable<ICategory[]> {
		return this.http.get<ICategory[]>(`/categories`);
	}
}
