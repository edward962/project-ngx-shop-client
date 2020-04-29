import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  public addToLocalStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {}
  }
  public getFromLocalStorage(key: string): any {
    try {
      const jsonStr = localStorage.getItem(key);
      if (!jsonStr) {
        return [];
      }
      return JSON.parse(jsonStr);
    } catch (err) {
      return [];
    }
  }
}
