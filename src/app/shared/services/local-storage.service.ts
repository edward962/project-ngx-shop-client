import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
	public addToLocalStorage<T>(key: string, data: T): void {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}

	public removeFromLocalStorage(key: string): void {
		try {
			localStorage.removeItem(key);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}

	public getFromLocalStorage<T>(key: string): T[] {
		try {
			const jsonStr = localStorage.getItem(key);
			if (!jsonStr) {
				return [];
			}
			return JSON.parse(jsonStr);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
			return [];
		}
	}

	public removeAllFromLocalStorage(): void {
		localStorage.removeItem('cart');
	}
}
