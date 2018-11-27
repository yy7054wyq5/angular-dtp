import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MuiGridService {
  private _unitWidth = 0;
  parentWidth = 0;
  unitHeight = 200;

  get unitWidth() {
    return this._unitWidth;
  }
  set unitWidth(size) {
    this._unitWidth = size;
    this.unitWidth$.next(size);
  }

  numberOfRows = 5;

  unitWidth$ = new Subject<number>();
  gridDragable$ = new Subject<boolean>();

  constructor() {}
}
