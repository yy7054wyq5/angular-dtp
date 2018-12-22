import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'scm-test-ng-for',
  templateUrl: './test-ng-for.component.html',
  styleUrls: ['./test-ng-for.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestNgForComponent implements OnInit {
  constructor() {}

  arr = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }, { id: 4, name: 'e' }];

  ngOnInit() {}

  trackFunc = (index, item) => {
    // return index;
    return 'xxx';
    // return item.id;
    // return item.name;
  };

  add() {
    const last = this.arr[this.arr.length - 1];
    this.arr.unshift({
      id: last.id,
      name: Math.random().toString()
    });
  }

  refresh() {
    this.arr = [...this.arr];
  }

  remove(i) {
    this.arr.splice(i, 1);
  }
}
