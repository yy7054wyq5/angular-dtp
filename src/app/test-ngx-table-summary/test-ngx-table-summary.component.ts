import { Component } from '@angular/core';

@Component({
  selector: 'scm-test-ngx-table-summary',
  templateUrl: './test-ngx-table-summary.component.html',
  styleUrls: ['./test-ngx-table-summary.component.less']
})
export class TestNgxTableSummaryComponent {
  rows = [];

  columns = [
    { prop: 'name', summaryFunc: null },
    // { name: 'Gender', summaryFunc: cells => this.summaryForGender(cells) },
    { prop: 'age', summaryFunc: cells => this.avgAge(cells) }
  ];

  enableSummary = true;
  summaryPosition = 'top';

  constructor() {
    this.fetch(data => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSummaryStateChange(a) {
    console.log(a);
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

  private avgAge(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return filteredCells.reduce((sum, cell) => (sum += cell), 0) / filteredCells.length;
  }
}
