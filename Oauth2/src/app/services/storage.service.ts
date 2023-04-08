import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set<T>(keyName: string, value: T): void {
    localStorage.setItem(keyName, JSON.stringify(value));
  }

  get<T>(keyName: string): T | null {
    const dataFromLocalStorage = localStorage.getItem(keyName);
    if (!!dataFromLocalStorage) {
      let data: T = JSON.parse(dataFromLocalStorage);
      return data
    }
    return null;
  }

  clear() {
    localStorage.clear();
  }
}
