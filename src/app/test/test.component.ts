import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'scm-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {
  constructor() {}

  @Input() data: any;
  @Output() oclick = new EventEmitter<any>();

  ngOnInit() {}

  outClick() {
    this.oclick.emit({
      data: this.data,
      other: 1
    });
  }
}
