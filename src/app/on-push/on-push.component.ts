import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'scm-on-push',
  templateUrl: './on-push.component.html',
  styleUrls: ['./on-push.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent implements OnInit, OnChanges {
  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  protected insertData;

  @Input() data;

  // @Input() set data(data) {
  //   this.insertData = data;
  //   // this.cdr.markForCheck();
  //   // this.cdr.detectChanges();
  // }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit() {
    this.insertData = this.data;
  }
}
