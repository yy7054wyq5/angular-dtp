import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { Subject } from 'rxjs';

console.log(212121);

@Component({
  // tslint:disable-next-line
  selector: 'scm-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.less']
})
export class AComponent implements OnInit {
  txt = 'jdkjdjaljda';
  constructor() {}

  @Input() txtaa;
  @Output() titleChange = new EventEmitter();

  ngOnInit() {}

  click() {
    this.titleChange.emit(this.txt);
  }
}
