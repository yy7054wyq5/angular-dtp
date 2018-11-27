import { Component, OnInit, Input, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { MuiGridService } from '../mui-grid/mui-grid.service';

@Component({
  // tslint:disable-next-line
  selector: '.mui-item',
  templateUrl: './mui-item.component.html',
  styleUrls: ['./mui-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MuiItemComponent implements OnInit {
  @Input() muiSpan: number[];

  private _selfDom: Element;

  constructor(private _e: ElementRef, private _render: Renderer2, public mugrid: MuiGridService) {
    this._selfDom = this._e.nativeElement;
  }

  ngOnInit() {
    if (!this.muiSpan) {
      this.muiSpan = [1, 1];
    }
    this.mugrid.unitWidth$.subscribe(unitWidth => {
      // console.log(unitSize);
      this._render.setStyle(this._selfDom, 'width', this.muiSpan[0] * unitWidth + 'px');
      this._render.setStyle(this._selfDom, 'height', this.muiSpan[1] * this.mugrid.unitHeight + 'px');
    });
  }
}
