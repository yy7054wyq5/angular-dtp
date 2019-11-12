import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvincesCitiesMapService {
  private idx = 0;
  constructor() {}

  updateIdx() {
    return (this.idx += 1);
  }
}
