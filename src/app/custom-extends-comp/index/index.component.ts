import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scm-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  value: boolean;
  constructor() {}

  ngOnInit() {}

  UI_console(a) {
    // console.log(a);
  }
}
