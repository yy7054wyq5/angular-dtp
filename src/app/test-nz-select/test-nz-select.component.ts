import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scm-test-nz-select',
  templateUrl: './test-nz-select.component.html',
  styleUrls: ['./test-nz-select.component.less']
})
export class TestNzSelectComponent implements OnInit {
  lis = [
    {
      name: 1,
      options: [
        {
          name: 1,
          value: 1
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}

  addLi() {
    this.lis = [{ name: 2, options: [] }, ...this.lis];
  }
}
