import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'scm-edit-demo',
  templateUrl: './test-ngx-table.component.html',
  styleUrls: ['./test-ngx-table.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TestNgxTableComponent {
  editing = {};
  rows = [];

  constructor() {}

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  add() {
    const newRow = {};
    for (const key in this.rows[0]) {
      if (this.rows[0].hasOwnProperty(key)) {
        newRow[key] = '';
      }
    }
    this.rows = [newRow, ...this.rows];
  }

  creatOptions() {
    const arr = [];
    for (let index = 0; index < 5; index++) {
      arr.push(Date.now());
    }
    return arr;
  }
}
