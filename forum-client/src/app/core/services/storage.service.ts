import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public get(key: string): string {
    return localStorage.getItem(key);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  // this method should be used only when we really need it
  // we'd rather write more granular code instead
  public clear(): void {
    localStorage.clear();
  }
}
