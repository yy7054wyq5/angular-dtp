import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'scm-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {
  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  constructor() {}

  ngOnInit() {}
}
