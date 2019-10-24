import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly store = new WeakMap<object, any>();
  private readonly storeKeysMap = {};
  constructor() {}

  private isObject(value): boolean {
    if (typeof value === 'object' && value instanceof Object) {
      return true;
    }
    return false;
  }

  private getStoreKey(key: any) {
    if (!this.isObject(key)) {
      return this.storeKeysMap[key];
    }
    return key;
  }

  private creatStoreKey(key: any) {
    if (!this.isObject(key)) {
      const keyObj = { [key]: 1 };
      this.storeKeysMap[key] = keyObj;
      return keyObj;
    }
    return key;
  }

  put(key: any, data: any): WeakMap<any, any> {
    return this.store.set(this.creatStoreKey(key), data);
  }

  get(key: any) {
    return this.store.get(this.getStoreKey(key));
  }

  remove(key: any): boolean {
    return this.store.delete(this.getStoreKey(key));
  }
}
