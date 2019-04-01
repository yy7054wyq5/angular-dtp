import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'scm-cdk-index',
  templateUrl: './cdk-index.component.html',
  styleUrls: ['./cdk-index.component.less']
})
export class CdkIndexComponent implements OnInit {

  data = [1,2,3,4];
  data1 = [];

  constructor() { }

  ngOnInit() {
  }

  
  UI_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
}
