import { Component, OnInit, AfterViewInit, NgZone, ViewEncapsulation, ElementRef, Renderer2, OnDestroy, Input } from '@angular/core';
import { MuiGridService } from './mui-grid.service';
import { Subject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
declare const Muuri: any;

@Component({
  // tslint:disable-next-line
  selector: '.mui-grid',
  templateUrl: './mui-grid.component.html',
  styleUrls: ['./mui-grid.component.less'],
  providers: [MuiGridService],
  encapsulation: ViewEncapsulation.None
})
export class MuiGridComponent implements OnInit, AfterViewInit, OnDestroy {
  private _gridInstance: any;
  private _dragable = true;
  private _gridDom: Element = this._e.nativeElement;
  private _option = {
    fillGaps: true,
    horizontal: true,
    dragEnabled: true,
    rounding: false,
    dragStartPredicate: (item, e) => {
      return this._dragable;
    }
  };

  @Input() reCalculateUnitWidth: Subject<any>;
  @Input()
  set muiDragable(bool) {
    this._dragable = bool;
    if (this._gridInstance) {
      if (bool) {
        this._render.addClass(this._gridDom, 'dragable');
      } else {
        this._render.removeClass(this._gridDom, 'dragable');
      }
    }
    of(bool)
      .pipe(delay(400))
      .subscribe(_bool => {
        this.common.gridDragable$.next(_bool);
      });
  }

  constructor(private _zone: NgZone, private _e: ElementRef, public common: MuiGridService, private _render: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this._initGrid();
    this.reCalculateUnitWidth.subscribe(() => {
      this._initGrid();
    });
  }

  ngOnDestroy() {}

  ///////////////////////

  _calculateUnitWidth(parent: Element) {
    this.common.parentWidth = parent.clientWidth;
    let unitWidth = parent.clientWidth / this.common.numberOfRows;
    const [prePoint, sufPoint] = unitWidth.toString().split('.');
    unitWidth = parseInt(prePoint, 10);
    this.common.unitWidth = unitWidth;
  }

  _initGrid() {
    this._calculateUnitWidth(this._gridDom.parentElement);
    this._zone.runOutsideAngular(() => {
      let dragCounter = 0;
      this._gridInstance = new Muuri('.mui-grid', this._option)
        .on('dragStart', () => {
          ++dragCounter;
          this._render.addClass(this._gridDom, 'dragging');
        })
        .on('dragEnd', () => {
          if (--dragCounter < 1) {
            this._render.removeClass(this._gridDom, 'dragging');
          }
        });
      console.log(this._gridInstance);
    });
  }
}
